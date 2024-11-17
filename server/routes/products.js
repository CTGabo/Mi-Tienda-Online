import express from 'express';
import Product from '../models/Product.js';
import auth from '../middleware/auth.js';
import upload from '../middleware/uploadMiddleware.js';
import cloudinary from '../config/cloudinary.js';
import fs from 'fs';

const router = express.Router();

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/// Obtener un producto por ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Crear un producto (protegido)
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const requiredFields = ['name', 'description', 'price', 'category', 'stock'];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({
          success: false,
          message: `El campo ${field} es requerido`
        });
      }
    }

    let imageUrl = '';
    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path);
        imageUrl = result.secure_url;
        // Eliminar archivo temporal
        fs.unlinkSync(req.file.path);
      } catch (uploadError) {
        console.error('Error al subir imagen:', uploadError);
        return res.status(500).json({
          success: false,
          message: 'Error al procesar la imagen'
        });
      }
    }

    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      price: Number(req.body.price),
      category: req.body.category,
      stock: Number(req.body.stock),
      image: imageUrl,
      createdBy: {
        userId: req.user._id,
        username: req.user.name
      }
    });

    const savedProduct = await product.save();
    res.status(201).json({
      success: true,
      data: savedProduct
    });
  } catch (error) {
    console.error('Error detallado:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error al crear producto'
    });
  }
});

export default router;
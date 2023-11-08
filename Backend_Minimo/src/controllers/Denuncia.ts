import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Denuncia from '../models/Denuncia';
import {mongoosePagination, PaginationOptions } from 'mongoose-paginate-ts';
import Product from '../models/Product';
import User from '../models/User';

const createDenuncia = async (req: Request, res: Response, next: NextFunction) => {
    const { userId, date, productId, gravity, description } = req.body;

    try {
        // Check if the user and product exist in the database by name
        const userExists = await User.findById( userId );
        const productExists = await Product.findById( productId);
    
        if (!userExists || !productExists) {
          return res.status(404).json({ message: 'User or product not found in the database', 
          userExists,
          productExists,
        });
        }
        
    const denuncia = new Denuncia({
        _id: new mongoose.Types.ObjectId(),
        userId: userExists.username,
        productId: productExists.name,
        gravity,
        date,
        description
    });

    const savedDenuncia = await denuncia.save();
    return res.status(201).json(savedDenuncia);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const readDenuncia = (req: Request, res: Response, next: NextFunction) => {
    const denunciaId = req.params.denunciaId;

    return Denuncia.findById(denunciaId)
        .then((denuncia) => (denuncia ? res.status(200).json(denuncia) : res.status(404).json({ message: 'Denuncia no encontrada' })))
        .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    const page = req.query.page ? parseInt(req.query.page as string, 10) : 1; 
    const options: PaginationOptions = {
        page,
        limit: 3
    };
    return Denuncia.paginate(options)
        .then((result) => res.status(200).json(result))
        .catch((error) => res.status(500).json({ error }));
};

const updateDenuncia = (req: Request, res: Response, next: NextFunction) => {
    const denunciaId = req.params.denunciaId;

    return Denuncia.findById(denunciaId)
        .then((denuncia) => {
            if (denuncia) {
                denuncia.set(req.body);

                return denuncia
                    .save()
                    .then((updatedDenuncia) => res.status(200).json(updatedDenuncia))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'Denuncia no encontrada' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteDenuncia = (req: Request, res: Response, next: NextFunction) => {
    const denunciaId = req.params.denunciaId;

    return Denuncia.findByIdAndDelete(denunciaId)
        .then((denuncia) => (denuncia ? res.status(204).json({ message: 'Denuncia eliminada' }) : res.status(404).json({ message: 'Denuncia no encontrada' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createDenuncia, readDenuncia, readAll, updateDenuncia, deleteDenuncia };

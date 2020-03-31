import User from '../models/User-model.mjs';
import Trip from '../models/Trip-model.mjs';
const passport   = require('passport');
const bcrypt     = require('bcryptjs');

export async function index(req, res) {
    try {
        const users = await User.find({});
        return res.send({users});
        
    } catch (error) {
        return res.status(500).send({message: 'Error al buscar usuarios', error})
    }
}

export async function show(req, res) {
    try {
        const user = await User.findOne({_id: req.params.id});
        if(!user){
            return res.status(404).send({message: 'Usuario no encontrado'});
        }
        return res.send({user});
        
    } catch (error) {
        return res.status(500).send({message: 'Error al mostrar usuario', error});
    }
}

export async function create(req, res) {
    try {
        const hash = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            user: req.body.user,
            email: req.body.email,
            birthday: req.body.birthday,
            phone: req.body.phone,
            gender: req.body.gender,
            password: hash
        });
        const user = await newUser.save();
        const newTrip = new Trip({
            user: newUser._id
        });
        const trolley = await newTrolley.save();

        return res.send({user, trolley});
        
    } catch (error) {
        res.status(500).send({message: 'Error al crear ususario', error});
    }
}

export async function update(req, res) {
    try {
        const user = await User.findOneAndUpdate({"_id":req.params.id},req.body,{new: true});
        return res.send({user});
    } catch (error) {
        return res.status(500).send({message: 'Error al actualizar usuario', error});
    }
}

export async function destroy(req, res){
    try {
        const user = await User.findOneAndDelete({"_id":req.params.id});
        return res.send({user});
    } catch (error) {
        return res.status(500).send({error});
    }
}

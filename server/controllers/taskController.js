const Task = require('../models/Task');

// Récupérer toutes les tâches
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des tâches", error: error.message });
    }
};

// Créer une nouvelle tâche
const createTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const newTask = new Task({ title, description, status });
        const savedTask = await Task.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(400).json({ message: "Erreur de validation lors de la création", error: error.message });
    }
};

// Mettre à jour uniquement le statut d'une tâche
const updateTaskStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ message: "Le champ statut est requis pour cette modification" });
        }

        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Tâche introuvable" });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: "Mise à jour impossible, données invalides", error: error.message });
    }
};

// Supprimer une tâche
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({ message: "Tâche introuvable ou déjà supprimée" });
        }

        res.status(200).json({ message: "Tâche supprimée avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression de la tâche", error: error.message });
    }
};

module.exports = {
    getAllTasks,
    createTask,
    updateTaskStatus,
    deleteTask
};

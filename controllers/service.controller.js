import Service from "../models/seviceSchema.js"


export async function createService(req, res) {
    try {
    const { title, description, price } = req.body;
    if (!title || !description || !price) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const newService = new Service({ 
        title,
        description,
        price,
        createdBy: req.user.id  
    });

    await newService.save()
    res.status(201).json({
        message:"Service created successfully", 
        service: newService
    })  

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


export async function getAllServices(req, res) {
    try {
        const services = await Service.find().populate({
            path: "createdBy",
            select:"name email role"
        })
        res.status(200).json({
            count: services.length, 
            services
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function getServiceById(req, res){
    try {
        const service = await Service.findById(req.params.id).populate({
            path:"createdBy",
            select:"name email role"
        })
        if(!service) 
            return res.status(404).json({message:"Service not found"})
        
        res.status(200).json(service)

    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
}



export async function updateService(req, res) {
    try {
        const service = await Service.findById(req.params.id)
        if (!service)
            return res.status(404).json({ error: 'Service not found' });
        
        const {title, description, price} = req.body
        if(title) service.title = title
        if(description) service.description = description
        if(price) service.price = price

        await service.save()
        res.status(200).json({
            message:"Service updated successfully",
            service
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}



export async function deleteService(req, res) {
    try {
        const service = await Service.findById(req.params.id)
        if(!service) 
            return ers.status(404).json({message:"Service not found"})

        await service.deleteOne()
        res.status(200).json({message: "Service deleted successfully"});
    
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
        


import { Viaje } from '../models/Viaje.js'
import { Testimonial } from '../models/Testimonial.js'

const paginaInicio = async (req, res) => {

    const promiseDB = []

    promiseDB.push(Viaje.findAll({ limit: 3}))
    promiseDB.push(Testimonial.findAll({ limit: 3}))

    try {

        const resultado = await Promise.all(promiseDB)

        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1],
            route: './viajes'
        })
    } catch (error) {
        console.log(error);
    }
    
}

const paginaNosotros = (req, res) => {
    res.render('nosotros', {
        pagina: 'Nosotros'
    })
}

const paginaViajes = async (req, res) => {

    /**
     * Query a database
     */
    const viajes = await Viaje.findAll()

    res.render('viajes', {
        pagina: 'Próximos Viajes',
        viajes
    })
}

const paginaTestimoniales = async (req, res) => {

    try {
        const testimoniales = await Testimonial.findAll()

        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        })
    } catch (error) {
        console.log(error);
    }

    
}

const paginaDetalleViaje = async (req, res) => {

    const { slug } = req.params
    /** 
     * Query a database for trip
     */
    try {
        const viaje = await Viaje.findOne({ where: { slug }})

        res.render('viaje', {
            pagina: 'Informacion Viaje',
            viaje
        })
    } catch(error) {
        console.log(error);
    }

}
export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}
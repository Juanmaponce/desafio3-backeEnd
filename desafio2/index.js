const Container = require('./contenedor')

const run = async function(){
    const file = new Container('productos.json')
    await file.init()

    const save = await file.save({ "Name": "Cheese", "Price" : 2.50, "Location": "Refrigerated foods"})
    const save1 = await file.save({ "Name": "Crisps", "Price" : 3, "Location": "the Snack isle"})
    const save2 = await file.save({ "Name": "Pizza", "Price" : 4, "Location": "Refrigerated foods"})
    const save3 = await file.save({ "Name": "Chocolate", "Price" : 1.50, "Location": "the Snack isle"})
    const save4 = await file.save({ "Name": "Self-raising flour", "Price" : 1.50, "Location": "Home baking"})
    const save5 = await file.save({ "Name": "Ground almonds", "Price" : 3, "Location": "Home baking"})
    console.log(`Nuevo item con id ${save}`)

    const all = file.getAll()
    console.log(`el tamaño de la lista es de ${all.length}`)

    const getId = file.getById(3)
    console.log(`el objeto es ${JSON.stringify(getId)}`)

    //file.deleteById(1)  //estos metodos estan deshabilitados para que no generen conflictos!
    
    //file.deleteAll()
}

run()
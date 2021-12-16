const fs = require('fs')

class Container{
    constructor(fileName){
        this.file = fileName
        this.countID = 0
        this.list = []
    }
    async init(){
        try{
            const data = await fs.promises.readFile(this.file, 'utf-8')
            this.list = JSON.parse(data)
            for(const element of this.list){
                if(element.id > this.countID) this.countID = element.id
            }
        }
        catch (error){
            console.log('No se encontro el archivo!!, generando...' + error)
        }
    }
    async write(){
        try{
            const str = JSON.stringify(this.list)
            await fs.promises.writeFile(this.file, str)
        }
        catch(err){
            return `Ocurrio un error al escrbir el archivo ${err}`
        }
    }
    async save(object){
        try{
            this.countID++
            object['id'] = this.countID
            this.list.push(object)
            await this.write()
            return this.countID
        }
        catch(err){
            return `Ocurrio un error al guardar el datos en el archivo${err}`
        }
    }
    getById(id){
        try{
            return this.list.find(item => item.id == id)
        }
        catch(err){
            return `Hubo un error al buscar el elemento${err}`
        }
    }
    getAll(){
        try{
            return this.list
        }
        catch(err){
            return `Hubo un error al obtener los elementos${err}`
        }
    }
    async deleteById(id){
        try{
            const index = this.list.findIndex((element) => element.id == id)
            this.list.splice(index, 1)
            await this.write()
            return `Se borro el elemento con id:${id}`
        }
        catch(err){
            return `Hubo un error al borrar el elemento ${err}`
        }
    }
    async deleteAll(){
        try{
            this.list = []
            await this.write()
            return `Se borraron todos los elementos del archivo`
        }
        catch(err){
            return `Hubo un error al borrar los elementos ${err}`
        }
    }
}

module.exports = Container
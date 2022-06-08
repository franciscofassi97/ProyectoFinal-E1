const fs = require("fs");

class Contenedor {
  constructor(nombreArchivo) {
    this.nombreArchivo = nombreArchivo;
  }
  save = async (object) => {
    try {
      let arrayObject = [];
      //Si no existe el archivo lo creo --> else
      if (fs.existsSync(this.nombreArchivo)) {
        const allData = await this.getAll();
        const id = allData[allData.length - 1].id + 1;
        object.id = id;
        allData.push(object);
        await fs.promises.writeFile(
          this.nombreArchivo,
          JSON.stringify(allData)
        );
        return object.id;
      } else {
        object.id = 1;
        arrayObject.push(object);
        await fs.promises.writeFile(
          this.nombreArchivo,
          JSON.stringify(arrayObject)
        );
        return object.id;
      }
    } catch (error) {
      console.error(`Error al guardar el objeto: ${error.message}`);
    }
  };

  getAll = async () => {
    try {
      let data = await fs.promises.readFile(this.nombreArchivo, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.log(`Error al leer todos los objetos`);
    }
  };

  getById = async (id) => {
    try {
      const allData = await this.getAll();
      let objectById = allData.find((object) => object.id == id);
      if (objectById) return objectById;
      else throw new Error("No encontrado");
    } catch (error) {
      console.log(`Error al leer el objeto: ${error.message}`);
    }
  };

  deleteById = async (id) => {
    try {
      const productToDelete = await this.getById(id);
      console.log(productToDelete);
      if (productToDelete) {
        const allData = await this.getAll();
        let newArrayObject = allData.filter((object) => object.id != id);
        if (allData)
          await fs.promises.writeFile(
            this.nombreArchivo,
            JSON.stringify(newArrayObject)
          );
        return productToDelete;
      } else throw new Error("No encontrado");
    } catch (error) {
      console.log(`Error al eliminar un objeto`);
    }
  };

  deleteAll = async () => {
    try {
      await fs.promises.writeFile(this.nombreArchivo, JSON.stringify([]));
    } catch (error) {
      console.log(`Error al eliminar todos los objetos`);
    }
  };

  updateById = async (id, newObject) => {
    try {
      const allData = await this.getAll();
      //Devuelve -1 si no lo no existe ese id
      let index = allData.findIndex((object) => object.id == id);
      if (index != -1) {
        newObject.id = parseInt(id);
        allData[index] = newObject;
        await fs.promises.writeFile(
          this.nombreArchivo,
          JSON.stringify(allData)
        );
      }
      return newObject.id;
    } catch (error) {
      console.log(`Error al actualizar un objeto`);
    }
  };
}

module.exports = Contenedor;

const Product = (sequelize, DataTypes)=>{
    const Product =  sequelize.define('products',{
        id:{
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue:DataTypes.UUIDV4
        },
        description:{
            type:DataTypes.TEXT,
            allowNull:true,
        },
        metadata:{
            type:DataTypes.TEXT,
            allowNull:true
        },
        imageUrl:{
            type:DataTypes.TEXT,
            allowNull:true,
            field: "image_url"  
        },
        price:{
            type:DataTypes.TEXT,
            allowNull:true
        },
        category:{
            type:DataTypes.TEXT,
            allowNull:true
        },

    },{
        underscored:true,
        tableName:'products',
        timestamps:true,
    });
    return Product;
}
module.exports = Product;

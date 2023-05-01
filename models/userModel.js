module.exports =(sequelize,DataTypes)=>{

    const User = sequelize.define("user",{
        id:{
            type:DataTypes.STRING,
            primaryKey:true,
            allowNull:false
        },
        username:{
            type: DataTypes.STRING,
            allowNull: false
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps:false
    });

    return User
}
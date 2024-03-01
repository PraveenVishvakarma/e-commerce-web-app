import prisma from "@/libs/prismadb";

interface IProductParams{
    searchTerm?:string | null,
    category?:string | null;
}

export default async function getProducts(params:IProductParams){
    try{
        const {category, searchTerm}=params;
        let searchString=searchTerm;
        if(!searchString){
            searchString="";
        }
        let query:any={};
        if(category){
            query.category=category;
        }
        const products=await prisma.product.findMany({
            where:{
                ...query,
                OR:[
                    {
                        name:{
                            contian:searchString,
                            mode:'insensitive'
                        },
                        description:{
                            contain:searchString,
                            mode:'insensitive'
                        }
                    }
                ]
            },
            include:{
                reviews:{
                    include:{
                        user:true
                    },
                    orderBy:{
                        createDate:'desc'
                    }
                }
            }
        });
        return products;
    }
    catch(error:any){
        throw new Error(error);
    }
}
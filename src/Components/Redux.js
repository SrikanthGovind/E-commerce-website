
import { createSlice } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';

const Products=createSlice({
    name:'products',
    initialState:{
     items:[],
     filterquery:'',
     checkeditems:[],
     selecteditem:'',
     limit:9
    },
    reducers:{
       fetchProducts:(state,action)=>{
         state.items=action.payload;
       },
       searchProducts:(state,action)=>{
        state.filterquery=action.payload;
      },
      checkedProducts:(state,action)=>{
           const item=action.payload
           if(Array.isArray(action.payload)){
            state.checkeditems=[...item]
            return;
           }
           state.checkeditems.unshift(item)   
      },
      addlimit:(state)=>{
        if (state.limit + 4 > 20) {
            state.limit=20
        }
         state.limit=state.limit+4
      },
      selectedProduct:(state,action)=>{
          state.selecteditem=action.payload
      }
    }
}) 

const Cart=createSlice({
    name:'cart',
    initialState:{
        items:[],
        totalQuantity:0,
        quantitystate:false
    },
    reducers:{
        addItemtoCart:(state,action)=>{
           const item=action.payload
           const exisitingitem=state.items.find((ele)=>ele.id===item.id)
           if(exisitingitem){
              exisitingitem.quantity++;
           }else{    
              state.items.push({...item,quantity:1,isAdded:true})
              state.totalQuantity++;
           }
        },
        removeItemtoCart:(state,action)=>{
              const filtereddata=state.items.filter((ele)=>ele.id!==action.payload)
              state.items=filtereddata  
              state.totalQuantity--;
        },
        Quantity:(state,action)=>{
            const type=action.payload.type
            const id=action.payload.id
            const exisitingitem=state.items.find((ele)=>ele.id===id)

           if(type==='increase'){
            exisitingitem.quantity++;
            }
            else{
            exisitingitem.quantity--;
            }

            if(exisitingitem.quantity===0){  
                const filtereditems=state.items.filter((ele)=>ele.id!==id);
                state.items=[...filtereditems]
                exisitingitem.isAdded=false
                state.totalQuantity--;
                state.quantitystate=true
            }
            
            if(exisitingitem.quantity===0 && state.items.length===0){
                state.quantitystate=false
            }
        },
        quantitystate:(state)=>{
            state.quantitystate=!state.quantitystate
        }
    }
})


const Buyproducts=createSlice({
      name:'buy',
      initialState:{
        items:[],
        quantity:1,
        orderconfirm:false
      },
      reducers:{
         addProduct:(state,action)=>{
             state.items=action.payload
         },
         handleQuantity:(state,action)=>{
             if(action.payload==='increase'){
                state.quantity++
             }
             else{
                state.quantity--
             }
             if(state.quantity===0){
                state.quantity=1
             }
         },
         handleconfirmBuy:(state)=>{
             state.orderconfirm=!state.orderconfirm
         },
         initialQuantity:(state)=>{
            state.quantity=1
         }
      }
})

const Rentproducts=createSlice({
    name:'rent',
    initialState:{
      items:[],
      orderconfirm:false,
      startdate:null,
      enddate:null
    },
    reducers:{
       addProduct:(state,action)=>{
           state.items=action.payload
       },
       handleconfirmRent:(state)=>{
        state.orderconfirm=!state.orderconfirm
       },
       setDate:(state,action)=>{
           if(action.payload.type==='start'){
            state.startdate=action.payload.Dateobject
           }
           else{
            state.enddate=action.payload.Dateobject
           }
       }
    }
})

const Orders=createSlice({
    name:'orders',
    initialState:{
        items:[]
    },
    reducers:{
        handleorders:(state,action)=>{
            const item=action.payload.data
            const  quantity=action.payload.Quantity

             let date=new Date();
             date=date.toLocaleDateString('en-CA')

              const random=Math.random().toFixed(2).slice(2)
              console.log(random);
              let deliverystatus= '';
              if(random>=70){
                 deliverystatus="Delivered"
              }
               else if(random>=30 && random<70){
                deliverystatus="pending"
              }
              else if(random>0 && random<30){
                deliverystatus="Cancelled"
              }

            if(action.payload.type==='buy'){
                state.items.unshift({...item,
                                 type:'Buy',
                                 date:date,
                                 quantity:quantity,
                                 deliverystatus:deliverystatus
                                })
            }
            else{
                state.items.unshift({...item, 
                                  type:"Rent",
                                  date:date,
                                  quantity:1,
                                  deliverystatus:deliverystatus
                                })
            }
        },
        handlemultipleOrder:(state,action)=>{
            const data=action.payload;   
             let date=new Date();
             date=date.toLocaleDateString('en-CA')

              data.map((ele)=>{

                const random=Math.random().toFixed(2).slice(2)
                let deliverystatus= '';
                if(random>=70){
                   deliverystatus="Delivered"
                }
                 else if(random>=30 && random<70){
                  deliverystatus="pending"
                }
                else if(random>0 && random<30){
                  deliverystatus="Cancelled"
                }

                  state.items.unshift({
                      ...ele,
                    type:'Buy',
                    date:date,
                    quantity:ele.quantity,
                    deliverystatus:deliverystatus
                  })
              })
        }
    }
})


export const store=configureStore({
    reducer:{
        product:Products.reducer,
        cart:Cart.reducer,
        buy:Buyproducts.reducer,
        rent:Rentproducts.reducer,
        orders:Orders.reducer,

    }
})

export const productAction=Products.actions;
export const cartActions=Cart.actions;
export const buyActions=Buyproducts.actions;
export const rentActions=Rentproducts.actions;
export const orderActions=Orders.actions;


export default async function fetchdata(limit){    
     const response=await fetch(`https://fakestoreapi.com/products?limit=${limit}`)
        const data=await response.json()
        return data
 }


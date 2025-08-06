
import { createStore } from "vuex";

const store = createStore({
  state: {
    products: [
        {
          ticker: "MARI",
          buyPrice: 10,
          tp1: 11,
          tp2: 12,
          tp3: 13,
          tpPercent: 2,
          boxBreak: 3,
          dip: 5,
          buySL: 4,
        },
        {
          ticker: "HCAR",
          buyPrice: 15,
          tp1: 16,
          tp2: 17,
          tp3: 18,
          tpPercent: 2,
          boxBreak: 3,
          dip: 10,
          buySL: 5,
        },
        {
          ticker: "NRL",
          buyPrice: 4,
          tp1: 5,
          tp2: 6,
          tp3: 7,
          tpPercent: 1,
          boxBreak: 2,
          dip: 2,
          buySL: 1,
        },
      ],
  },
  mutations: {
    ADD_PRODUCT(state, product) {
      state.products.push(product);
    },
    UPDATE_PRODUCT(state,payload){
        state.products.splice(payload.index,1,payload.product)
    },
    DELETE_PRODUCT(state,index){
        state.products.splice(index,1)
    }
  }
});

export default store;
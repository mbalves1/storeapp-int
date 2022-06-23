<template>
  <q-page class="flex flex-center containeer">
    <transition name="card">
      <div v-if="notify" class="notify">
        <span>Primeiro escolha um plano de internet!</span>
      </div>
    </transition>
    <div>
      <h4>Internet</h4>
      <p>Selecione um plano de internet para continuar</p>
      <div class="containeer--items">
        <q-card v-for="(item, i) in products.internet" :key="i" @click="getItemInternet(i, item)" class="containeer--items--box" :class="hasColor">
          <span class="containeer--items--box--title">{{item.type}}</span>
          <p class="containeer--items--box--price">R$ {{item.price}},00</p>
        </q-card>
      </div>
    </div>
    <div>
      <h4>TV</h4>
      <p>Escolha um plano de TV fixo</p>
      <div class="containeer--items">
        <q-card v-for="(item, i) in products.tv" :key="i" @click="getItemTv(i, item)" class="containeer--items--box">
          <span class="containeer--items--box--title">{{item.type}}</span>
          <p class="containeer--items--box--price">R$ {{item.price}},00</p>
        </q-card>
      </div>
    </div>
    <div>
      <h4>Fixo</h4>
      <p>Escolha um plano de telefone fixo</p>
      <div>
        <q-card v-for="(item, i) in products.telefone" :key="i" @click="getItemTelefone(i, item)" class="containeer--items--box">
          <span class="containeer--items--box--title">{{item.type}}</span>
          <p class="containeer--items--box--price">R$ {{item.price}},00</p>
        </q-card>
      </div>
    </div>
    <q-separator style="width: 100%; margin: 30px 0"/>
    <section class="containeer--basket">
      <p>Produtos</p>
      <div v-for="(item, idx) in basket" :key="idx">
        <div class="containeer--basket--items" v-if="item.type">
          <span>{{item.type}}</span>
          <span>R$ {{item.price || 0}},00 <span @click="remove(idx)" style="cursor:pointer" v-if="item.type">x</span></span>
        </div>
      </div>
      <q-separator style="width: 100%; margin: 30px 0"/>
      <section class="containeer--basket">
        <div class="containeer--basket--total">
          <span>Total</span>
          <span>R$ {{total}},00</span>
        </div>
      </section>
      <q-btn color="purple" @click="requestOrder">Finalizar pedido</q-btn>
    </section>
    <q-dialog v-model="alert" transition-show="true" :full-width="true">
      <q-card>
        <q-card-section>
          <div class="text-h6">Pedido</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div v-for="(item, idx) in basket" :key="idx">
            <div class="containeer--basket--items">
              <span>{{item.type}}</span>
              <span>R$ {{item.price || 0}},00</span>
            </div>
          </div>
          <div style="display: flex; justify-content: space-between; background: purple; color: white; padding: 5px; font-weight: bold; border-radius: 4px">
            <span>Total</span><span>R$ {{total}},00</span>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn :disable="disabledButton" flat label="Finalizar" color="purple" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { mapActions, mapState } from 'vuex'

export default defineComponent({
  name: 'IndexPage',
  data () {
    return {
      basket: {
        telefone: {},
        tv: {},
        internet: {}
      },
      disabled: true,
      notify: false,
      hasColor: '',
      alert: false,
      disabledButton: true
    }
  },
  async created() {
    await this.getProd()
  },
  computed: {
    ...mapState('produto', ['products']),
    total () {
      let tel = Number(this.basket.telefone.price) || 0
      let net = Number(this.basket.internet.price) || 0
      let tv = Number(this.basket.tv.price) || 0
      return tel + net + tv
    },
    picked (i) {
      let array = {
        0: 'azul',
        1: 'azul',
        2: 'ver'
      }
    }
  },
  methods: {
    ...mapActions('produto', ['getProducts']),
    async getProd () {
      await this.getProducts()
    },
    getItemInternet (i, item) {
      console.log('i', i)
       let array = {
        0: 'azul',
        1: 'verd',
        2: 'ver'
      }
      array[i]
      if (this.products.internet !== 0) {
        this.basket.internet = ''
        this.basket.internet = item
        this.hasShadow = false
        this.disabled = false
      }
    },
    getItemTv (i, item) {
      if (this.disabled) {
        this.notify = true
        return
      }
      if (this.products.tv.length !== 0) {
        this.basket.tv = ''
        this.basket.tv = item
      }
    },
    getItemTelefone (i, item) {
      if (this.disabled) {
        this.notify = true
        return
      }
      if (this.products.telefone.length !== 0) {
        this.basket.telefone = ''
        this.basket.telefone = item
      }
    },
    remove (index) {
      let ix = index
      this.basket[index] = ''
    },
    requestOrder () {
      if (this.disabled) {
        this.disabledButton = true
        return
      }
      this.disabledButton = false
      this.alert = !this.alert
    }
  },
  watch: {
    'notify' (val) {
      if (this.disabled) {
        setTimeout(() => {
          this.notify = false
        }, 1200)
      }
    },
    disabled (val) {
      console.log('vale', val)
    }
  }
})
</script>
<style lang="scss" scoped>
.azul {
  background: blue;
}
.verd {
  background: green;
}
.ver {
  background: red;
}
h4 {
  margin-bottom: 5px;
  color: purple;
}
.containeer {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 10%;

  &--items {
    display: flex;
    gap: 20px;

    &--box {
      padding: 20px;
      width: auto;
      cursor: pointer;

      &--title {
        font-size: 18px;
        color: rgb(173, 16, 173);
      }
      &--price {
        font-size: 16px;
        margin: 22px 0 0 25px;
      }
    }
  }

  &--basket {
    width: 100%;
    align-items: flex-start;
    margin-bottom: 50px;

    p {
      color: purple;
    }

    &--total {
      display: flex;
      justify-content: space-between;
      color: purple;
      font-weight: bold;
      font-size: 16px;
    }
    &--items {
      display: flex;
      justify-content: space-between;
    }
  }
}

.notify {
  background: rgb(235, 190, 106);
  padding: 20px;
  display: flex;
  margin-top: 10px;
  border-radius: 4px;
  border-left: orange 4px solid;
  position: absolute;
  right: 10px;
  top: 50%;
  z-index: 10;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .10s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}

@media (max-width: 544px) {
  .containeer {
    display: flex;
    align-items: flex-start;
    &--items {
      display: flex;
      flex-direction: column;
      margin: 0 10px;
    }
  }
}
</style>

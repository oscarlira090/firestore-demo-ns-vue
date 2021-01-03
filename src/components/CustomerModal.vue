<template>
  <Page>
    <GridLayout rows="auto,auto,*">
      <HeaderModal @onSave="save" @onCancel="cancel"></HeaderModal>
      <Button
        @tap="remove"
        class="fa btn-cancel"
        row="1"
        col="0"
        height="40"
        width="20%"
        horizontalAlignment="left"
        :visibility="customer.id == '' ? 'collapse' : 'visible'"
        >{{ "fa-trash-o" | fonticon }} Delete</Button
      >
      <RadDataForm
        ref="dataForm"
        :source="customer"
        :metadata="metadata"
        row="2"
        col="0"
      >
      </RadDataForm>
    </GridLayout>
  </Page>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import CustomerMetaData from "@/components/models/CustomerMetaData.ts";
import Customer from "@/components/models/Customer.ts";
import HeaderModal from "@/components/partials/HeaderCustomerModal.vue";
import { confirm } from "@nativescript/core/ui/dialogs";

const customerMetaData = new CustomerMetaData();

@Component({
  components: {
    HeaderModal,
  },
  filters: {},
})
export default class App extends Vue {
  $refs!: {
    dataForm: HTMLFormElement;
  };

  @Prop() private p_customer: object;
  metadata = customerMetaData;

  mounted() {
    if (this.p_customer != undefined) {
      this.$store.dispatch("customer/set", this.p_customer);
    } else {
      this.$store.dispatch("customer/setDefault");
    }
  }

  get customer() {
    return this.$store.getters["customer/get"];
  }

  save() {
    var vm = this;
    let form = this.$refs.dataForm.nativeView;

    form.validateAll().then((result) => {
      let customer = vm.$store.getters["customer/get"];
      if (result) {
        if (customer.id != "") {
          //refactor in a saveOrUpdate Function passing the id customer
          vm.$store
            .dispatch("customer/update", {
              id: customer.id,
              first_name: form.getPropertyByName("first_name").valueCandidate,
              last_name: form.getPropertyByName("last_name").valueCandidate,
            })
            .then(function (data) {
              console.log(data);
              vm.$store.dispatch("customer/setDefault");
              vm.$closeModal(vm, true);
            });
        } else {
          vm.$store
            .dispatch("customer/save", {
              first_name: form.getPropertyByName("first_name").valueCandidate,
              last_name: form.getPropertyByName("last_name").valueCandidate,
            })
            .then(function (data) {
              console.log(data);
              vm.$store.dispatch("customer/setDefault");
              vm.$closeModal(vm, true);
            });
        }
      }
    });
  }

  remove() {
    let vm = this;
    confirm("Delete?").then((result) => {
      if (result) {
        let customer = vm.$store.getters["customer/get"];
        vm.$store.dispatch("customer/remove", customer).then(function (data) {
          console.log("Customer deleted Successfully");
          vm.$closeModal(vm, null);
        });
      }
    });
  }

  cancel() {
    this.$closeModal(this, null);
  }
}
</script>

<style scoped>
.btn-cancel {
  background-color: red;
  color: #fff;
}
</style>

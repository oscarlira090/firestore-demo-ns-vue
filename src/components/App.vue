<template>
  <Page>
    <ActionBar title="Firestore in NativeScript-Vue!" />
    <GridLayout columns="*" rows="*">
      <ActivityIndicator
        row="0"
        :busy="loading"
        :visibility="!loading ? 'collapse' : 'visible'"
        verticalAlignment="top"
      />
      <ListView for="item in customers" @itemTap="onItemTap" row="0">
        <v-template>
          <!-- Shows the list item label in the default color and style. -->
          <Label :text="item.first_name + ' ' + item.last_name" />
        </v-template>
      </ListView>

      <Fab
        @tap="add"
        row="0"
        icon="res://ic_add_white"
        rippleColor="#f1f1f1"
        class="fab-button fa"
        >{{ "fa-plus" | fonticon }}</Fab
      >
    </GridLayout>
  </Page>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import * as Toast from "nativescript-toast";

@Component({
  components: {},
  filters: {},
})
export default class App extends Vue {
  loading = false;

  mounted() {
    let vm = this;
    vm.loading = true;
    this.$store.dispatch("customer/load").then(function () {
      vm.loading = false;
    });
  }

  get customers() {
    return this.$store.getters["customer/all"];
  }

  onItemTap(event) {
    this.$gotToModal("CustomerModal", {
      p_customer: event.item,
    }).then(function (data) {
      console.log("data", data == true);
      if (data == true) {
        var toast = Toast.makeText("Updated successfully");
        toast.show();
      }
    });
  }

  add() {
    this.$gotToModal("CustomerModal", {}).then(function (data) {
      if (data == true) {
        var toast = Toast.makeText("Added successfully");
        toast.show();
      }
    });
  }
}
</script>

<style scoped>
Label {
  color: black;
  font-size: 16pt;
}

.fab-button {
  height: 70;
  width: 70;
  margin: 15;
  background-color: #ff4081;
  horizontal-align: right;
  vertical-align: bottom;
  color: #fff;
}
</style>

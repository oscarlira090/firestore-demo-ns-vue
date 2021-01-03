<template>
  <GridLayout row="0" col="0" columns="auto,*,*" class="modal-header">
    <Label
      class="fa"
      :text="'fa-arrow-left' | fonticon"
      horizontalAlignment="left"
      col="0"
      backgroundColor="#0000"
      style="padding-right: 10"
      @tap="cancel"
    />
    <Label
      text="Save Customer"
      horizontalAlignment="center"
      col="1"
      backgroundColor="#0000"
    />
    <Label
      text="Ok"
      horizontalAlignment="right"
      backgroundColor="#0000"
      col="2"
      style="padding-left: 10; margin-right: 5"
      @tap="save"
    />
  </GridLayout>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class App extends Vue {
  $refs!: {
  };

  @Prop() private p_customer: object;

  mounted() {
    
  }

  save() {
    this.$emit('onSave');
  }

  cancel() {
    this.$emit('onCancel');
  }
}
</script>

<style scoped>
.modal-header {
  background-color: #3a53ff;
  color: #fff;
  font-weight: 500;
  padding: 15;
  font-size: 18pt;
}


</style>

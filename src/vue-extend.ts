import { Vue } from "vue-property-decorator";

declare module "vue-property-decorator" {
  interface Vue {
    $gotToModal(to,props);
    $closeModal(context,data);
  }
}
<script>
import { getNavMenus } from "../dao";

export default {
  name: "moguideCrud",

  data() {
    return {
      logo: "TEST",
      header: {
        app: "Test"
      },
      user: {
        name: "test",
        tooltip: "qq test"
      },
      menus: []
    };
  },

  async mounted() {
    this.menus = await getNavMenus();
  },

  render() {
    const { logo, header, user, menus } = this;

    return (
      <mo-basic-layout logo={logo} header={header} user={user} menus={menus}>
        <router-view></router-view>
      </mo-basic-layout>
    );
  }
};
</script>

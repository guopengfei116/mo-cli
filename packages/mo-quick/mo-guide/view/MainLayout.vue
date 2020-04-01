<script>
import { getNavMenus } from "../dao";

export default {
  name: "moguideCrud",

  data() {
    return {
      logo: "MO",

      header: {
        app: "Mo Guide"
      },

      user: {
        name: "guide",
        tooltip: "mo guide"
      },

      menus: [
        {
          depth: 0,
          id: 1,
          parentId: 0,
          text: "Guide",
          url: "/mo",
          children: [
            {
              children: [],
              depth: 1,
              id: 11,
              parentId: 1,
              text: "UI",
              url: "/mo/ui"
            },
            {
              children: [],
              depth: 1,
              id: 12,
              parentId: 1,
              text: "Http",
              url: "/mo/http"
            }
          ]
        }
      ]
    };
  },

  async mounted() {
    // this.menus = await getNavMenus();
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

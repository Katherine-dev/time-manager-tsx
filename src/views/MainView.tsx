import { Component, Prop, Vue } from 'vue-property-decorator';
import { VApp, VAppBar, VAppBarNavIcon, VContainer, VDivider, VList, VListItem, VListItemContent, VListItemTitle, VMain, VNavigationDrawer } from 'vuetify/lib';
import { VueComponent } from '../shims-vue';

import styles from './MainView.css?module';

interface NavigationLink {
  title: string,
  route: string
}

interface Props {
  msg: string
}

@Component
export default class MainView extends VueComponent<Props> {

  @Prop()
  private msg!: string;

  private items: Array<NavigationLink> = [
    {
      title: 'Study',
      route: '/study'
    },
    {
      title: 'Work',
      route: '/work'
    },
    {
      title: 'Hobby',
      route: '/hobby'
    },
    {
      title: 'Places',
      route: '/places'
    },
    {
      title: 'Recipes',
      route: '/recipes'
    },
  ];

  private drawer: boolean = false;

  private toggleDrawer(): void {
    this.drawer = !this.drawer;
  }

  render() {
    return (
      <VApp>
        <VNavigationDrawer
          app
          v-model={this.drawer}
          absolute
          temporary
          elevate-on-scroll
          scroll-target="main-content"
        >
          <VListItem>
            <VListItemContent>
              <VListItemTitle class="text-h6">
                Life Balance
              </VListItemTitle>
            </VListItemContent>
          </VListItem>

          <VDivider />

          <VList
            dense
            nav
          >
            {
              this.items.map(item => {
                return (
                  <VListItem
                    link
                  >
                    <VListItemContent>
                      <VListItemTitle>
                        <router-link to={item.route} class='subtitle-1'> {item.title}</router-link>
                      </VListItemTitle>
                    </VListItemContent>
                  </VListItem>
                )
              })
            }
          </VList>
        </VNavigationDrawer>

        <VAppBar app>
          <VAppBarNavIcon onClick={this.toggleDrawer}></VAppBarNavIcon>
        </VAppBar>

        <VMain
          id="main-content"
        >
          <VContainer fluid>
            <router-view></router-view>
          </VContainer>
        </VMain>

      </VApp>
    )
  }
}

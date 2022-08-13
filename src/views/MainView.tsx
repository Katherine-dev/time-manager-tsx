import { VNode } from 'vue';
import { Component, Prop, Vue } from 'vue-property-decorator';
import {
  VApp,
  VAppBar,
  VAppBarNavIcon,
  VBtn, VContainer,
  VDivider,
  VList,
  VListItem,
  VListItemContent,
  VListItemTitle,
  VMain,
  VNavigationDrawer,
  VSpacer,
} from 'vuetify/lib';
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
      route: '/study',
    },
    {
      title: 'Work',
      route: '/work',
    },
    // {
    //   title: 'Hobby',
    //   route: '/hobby'
    // },
    {
      title: 'Places',
      route: '/places',
    },
    {
      title: 'Recipes',
      route: '/recipes',
    },
  ];

  private drawer = false;

  private activeTimeButton = '';

  private created(): void {
    if (this.$route.path === '/places' && this.$route.query?.time === 'now') {
      this.activeTimeButton = 'now';
    } else if (this.$route.path === '/places' && this.$route.query?.time === 'later') {
      this.activeTimeButton = 'later';
    }
  }

  private toggleDrawer(): void {
    this.drawer = !this.drawer;
  }

  private togglePlaceButtons(time: string): void {
    if (this.$route.path === '/places') {
      this.activeTimeButton = time;

      if (this.$route.query?.time !== time) {
        this.$router.push({ query: { ...this.$route.query, time } });
      }
    }
  }

  private renderPlacesButtons(): VNode | undefined {
    if (this.$route.path === '/places') {
      return (
        <div>
          <VBtn
            text
            onClick={() => this.togglePlaceButtons('now')}
            class={{ [styles.activeButton]: this.activeTimeButton === 'now' }}
          >
            Сейчас
          </VBtn>

          <VBtn
            text
            onClick={() => this.togglePlaceButtons('later')}
            class={{ [styles.activeButton]: this.activeTimeButton === 'later' }}
          >
            Позже
          </VBtn>
        </div>
      );
    }
    return undefined;
  }

  render() {
    return (
      <VApp class={styles.fullHeight}>
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
              this.items.map((item) => (
                  <VListItem
                    link
                  >
                    <VListItemContent>
                      <VListItemTitle onClick={() => this.changeRoute(item.route)}>
                        {item.title}
                      </VListItemTitle>
                    </VListItemContent>
                  </VListItem>
              ))
            }
          </VList>
        </VNavigationDrawer>

        <VAppBar app>
          <VAppBarNavIcon onClick={this.toggleDrawer}></VAppBarNavIcon>
          <VSpacer></VSpacer>
          {this.renderPlacesButtons()}
        </VAppBar>

        <VMain
          class={styles['main-content']}
          id="main-content"
        >
          <VContainer fluid class={styles['main-container']}>
            <router-view></router-view>
          </VContainer>
        </VMain>

      </VApp>
    );
  }

  private changeRoute(route: string): void {
    if (this.$route.path !== route && route === '/places') {
      this.$router.push({ path: route, query: { time: 'now' } });
    } else if (this.$route.path !== route && route !== '/places') {
      this.$router.push({ path: route });
    }
  }
}

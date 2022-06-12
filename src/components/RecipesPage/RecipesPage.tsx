import { VueComponent } from '@/shims-vue';
import { Component, Watch} from 'vue-property-decorator';
import { VBtn, VCard, VCardActions, VCardText, VCardTitle, VCol, VContainer, VDataTable, VDialog, VDivider, VIcon, VRow, VSpacer, VTextField, VToolbar } from 'vuetify/lib';
import { VToolbarTitle } from 'vuetify/lib/components';

import styles from './RecipesPage.css?module';

interface RecipeTableColumn {
  text: string,
  align: string,
  sortable: boolean,
  value: string,
}

interface Dish {
  name: string,
  link: string
}

@Component
export default class RecipesPage extends VueComponent {
  private dialog: boolean = false;

  private dialogDelete: boolean = false;

  private headers: Array<RecipeTableColumn> = [
    {
      text: 'Dish',
      align: 'start',
      sortable: true,
      value: 'name',
    },
    { 
      text: 'Link', 
      align: 'start',
      sortable: false,
      value: 'link'
    }
  ];

  private  dishes: Array<Dish> =  [{name: 'dfdf', link: 'fdfd'}];

  private editedIndex: number  = -1;

  private  editedItem: Dish  = {
    name: '',
    link: ''
  };

  private defaultItem: Dish  = {
    name: '',
    link: ''
  };

  @Watch('dialog') 
    onDialogStateChange (val: boolean) {
      val || this.close()
    }

  @Watch('dialogDelete') 
  onDialogDeleteStateChange (val: boolean) {
    val || this.closeDelete()
  }

  private created () {
    this.initialize()
  };

  private initialize () {};

  private editItem (item: Dish) {
    this.editedIndex = this.dishes.indexOf(item)
    this.editedItem = Object.assign({}, item)
    this.dialog = true
  };

  private deleteItem  (item: Dish) {
    this.editedIndex = this.dishes.indexOf(item)
    this.editedItem = Object.assign({}, item)
    this.dialogDelete = true
  };

  private deleteItemConfirm () {
    this.dishes.splice(this.editedIndex, 1)
    this.closeDelete()
  };

  private close () {
    this.dialog = false
    this.$nextTick(() => {
      this.editedItem = Object.assign({}, this.defaultItem)
      this.editedIndex = -1
    })
  };

  private closeDelete () {
    this.dialogDelete = false
    this.$nextTick(() => {
      this.editedItem = Object.assign({}, this.defaultItem)
      this.editedIndex = -1
    })
  };

  private save () {
    if (this.editedIndex > -1) {
      Object.assign(this.dishes[this.editedIndex], this.editedItem)
    } else {
      this.dishes.push(this.editedItem)
    }
    this.close()
  };

  render() {
    return (
      <div>
        <VDataTable
          headers={this.headers}
          items={this.dishes}
          sort-by="id"
          class="elevation-1"
          scopedSlots ={{
            top: () =>
            <VToolbar
              flat
            >
              <VToolbarTitle>Рецептики</VToolbarTitle>
              <VDivider
                class="mx-4"
                inset
                vertical
              ></VDivider>
              <VSpacer></VSpacer>
              <VDialog
                v-model={this.dialog}
                max-width="500px"
                scopedSlots={{
                  //TODO: Change types
                  activator: ({ on, attrs }: { on: any, attrs: any }) =>
                    <VBtn
                      color="primary"
                      dark
                      class="mb-2"
                      {...attrs}
                      on={on}
                    >
                      New Item
                    </VBtn>
                }}
              >
                <VCard>
                  <VCardTitle>
                    <span class="text-h5">Добавление рецепта</span>
                  </VCardTitle>

                  <VCardText>
                    <VContainer>
                      <VRow>
                        <VCol
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <VTextField
                            v-model={this.editedItem.name}
                            label="Dish name"
                          ></VTextField>
                        </VCol>
                        <VCol
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <VTextField
                            v-model={this.editedItem.link}
                            label="link"
                          ></VTextField>
                        </VCol>
                      </VRow>
                    </VContainer>
                  </VCardText>

                  <VCardActions>
                    <VSpacer></VSpacer>
                    <VBtn
                      color="blue darken-1"
                      text
                      onClick={this.close}
                    >
                      Cancel
                    </VBtn>
                    <VBtn
                      color="blue darken-1"
                      text
                      onClick={this.save}
                    >
                      Save
                    </VBtn>
                  </VCardActions>
                </VCard>
              </VDialog>
              
              <VDialog v-model={this.dialogDelete} max-width="500px">
                <VCard>
                  <VCardTitle class="text-h5">Are you sure you want to delete this item?</VCardTitle>
                  <VCardActions>
                    <VSpacer></VSpacer>
                    <VBtn color="blue darken-1" text onClick={this.closeDelete}>Cancel</VBtn>
                    <VBtn color="blue darken-1" text onClick={this.deleteItemConfirm}>OK</VBtn>
                    <VSpacer></VSpacer>
                  </VCardActions>
                </VCard>
              </VDialog>
            </VToolbar>,
            ['item.action']: (item) =>  {
            <template>
              <VIcon
                small
                class="mr-2"
                onClick={this.editItem(item)}
              >
                mdi-pencil
              </VIcon>
              <VIcon
                small
                onClick={this.deleteItem(item)}
              >
                mdi-delete
              </VIcon>
            </template>
            },
            ['no-data']: () => {
              <template>
                <VBtn
                  color="primary"
                  onClick={this.initialize}
                >
                  Reset
                </VBtn>
              </template>
            }
          }}
        >
        </VDataTable>
      </div>
    )
  }
}

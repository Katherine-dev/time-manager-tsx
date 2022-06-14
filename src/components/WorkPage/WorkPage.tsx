import { Component } from 'vue-property-decorator';
import { VBtn, VCard, VCardActions, VCardText, VCardTitle, VCol, VContainer, VDialog, VRow, VSpacer, VTextarea } from 'vuetify/lib';
import { VueComponent } from '../../shims-vue';


import styles from './WorkPage.css?module';

interface Weekday {
  title: string,
  description: string
}


@Component
export default class WorkPage extends VueComponent {

  private cards: Array<Weekday> = [
    { title: 'Понедельник', description: 'fdfd' },
    { title: 'Вторник', description: 'vfdfd' },
    { title: 'Среда', description: '' },
    { title: 'Четверг', description: '' },
    { title: 'Пятница', description: '' },
    { title: 'Суббота', description: '' },
    { title: 'Воскресенье', description: '' },
  ];

  private dialog: boolean = false;

  private editedItem: Weekday = {
    title: '',
    description: ''
  };

  private defaultItem: Weekday = {
    title: '',
    description: ''
  };

  private editedIndex: number = 0;

  mounted(): void {
    const localNotes = localStorage.getItem('cards');
    
    if (localNotes) {
      this.cards = JSON.parse(localNotes);
    } else {
      const parsed = JSON.stringify(this.cards);
      localStorage.setItem('cards', parsed);
    }
  };

  private editNote(note: Weekday): void {
    this.editedIndex = this.cards.indexOf(note);
    this.editedItem = Object.assign({}, note);
    this.dialog = true;
  };

  private close(): void {
    this.dialog = false;
    this.$nextTick(() => {
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    })
  };

  private save(): void {
    if (this.editedIndex > -1) {
      Object.assign(this.cards[this.editedIndex], this.editedItem);
      localStorage.setItem('cards', JSON.stringify(this.cards));
    }
    this.close();
  };

  render() {
    return (
      <div>
        <VRow dense>
          {
            this.cards.map((card, index) => {
              return (
                <VCol
                  key={card.title + index}
                  cols={6}
                >
                  <VCard>
                    <VCardTitle domPropsInnerHTML={card.title}></VCardTitle>
                    <VCardText
                      domPropsInnerHTML={card.description}
                      class={styles['card-text']}
                    ></VCardText>
                    <VCardActions>
                      <VSpacer></VSpacer>

                      <VBtn
                        onClick={() => this.editNote(card)}
                      >
                        Edit
                      </VBtn>
                    </VCardActions>
                  </VCard>
                </VCol>
              )
            })
          }
        </VRow>

        <VDialog
          v-model={this.dialog}
          max-width="500px"
        >
          <VCard>
            <VCardTitle>
              <span class="text-h5">Edit item</span>
            </VCardTitle>

            <VCardText>
              <VContainer>
                <VRow>
                  <VCol
                    cols="auto"
                    class={styles['note-textarea']}
                  >
                    <VTextarea
                      v-model={this.editedItem.description}
                      label="Description"
                    ></VTextarea>
                  </VCol>
                </VRow>
              </VContainer>
            </VCardText>

            <VCardActions>
              <VSpacer />
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
      </div>
    )
  }
}

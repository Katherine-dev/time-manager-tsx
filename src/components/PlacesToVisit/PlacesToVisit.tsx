import { VNode } from 'vue';
import { Component, Vue } from 'vue-property-decorator';
import { VBtn, VCard, VCardActions, VCardText, VCardTitle, VCol, VContainer, VDialog, VFileInput, VIcon, VImg, VRow, VSpacer, VTab, VTabItem, VTabs, VTextarea, VTextField, VVirtualScroll } from 'vuetify/lib';
import { VueComponent } from '../../shims-vue';

import styles from './PlacesToVisit.css?module';

interface Place {
  id: number,
  name: string,
  description: string,
  imageUrl: string
}

@Component
export default class PlacesToVisit extends VueComponent {

  private placesNow: Array<Place> = [
    { 
      id: 1,
      name: 'Байкал',
      description: 'Жесть, вот это озеро',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/%D0%9C%D1%8B%D1%81_%D0%9B%D1%83%D0%B4%D0%B0%D1%80%D1%8C%2C_17_%D0%B8%D1%8E%D0%BD%D1%8F_2013_%D0%B3%D0%BE%D0%B4%D0%B0.jpg' 
    },
    { 
      id: 1,
      name: 'Байкал',
      description: 'Жесть, вот это озеро',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/%D0%9C%D1%8B%D1%81_%D0%9B%D1%83%D0%B4%D0%B0%D1%80%D1%8C%2C_17_%D0%B8%D1%8E%D0%BD%D1%8F_2013_%D0%B3%D0%BE%D0%B4%D0%B0.jpg' 
    }
  ];
  private placesLater: Array<Place> = [];
  private dialog: boolean = false;
  private mode: string = '';
  private userImage: string | ArrayBuffer = '';


  private newPlace: Place = {
    id: 0,
    name: '',
    description: '',
    imageUrl: ''
  };

  private defaultPlace: Place = {
    id: 0,
    name: '',
    description: '',
    imageUrl: ''
  };

  private mounted(): void {
    let localPlacesNow = localStorage.getItem('placesNow');
    let localPlacesLater = localStorage.getItem('placesLater');

    if (localPlacesNow && localPlacesLater) {
      this.placesNow = JSON.parse(localPlacesNow);
      this.placesLater = JSON.parse(localPlacesLater);
    } else {
      let parsed = JSON.stringify(this.placesNow);
      localStorage.setItem('placesNow', parsed);
      
      parsed = JSON.stringify(this.placesLater);
      localStorage.setItem('placesLater', parsed);
    }
  };

  private addPlace(): void {
    this.dialog = true;
    this.mode = 'create';
  }

  private close(): void {
    this.dialog = false;
    this.mode = '';

    this.$nextTick(() => {
      this.newPlace = Object.assign({}, this.defaultPlace);
    })
  };

  private save(): void {

    if (this.mode === 'edit' && this.$route.query.time === 'now') {
      this.placesNow.forEach((el, index) => {

        if (el.id === this.newPlace.id) {
          el.name = this.newPlace.name;
          el.description = this.newPlace.description;
          el.imageUrl = this.newPlace.imageUrl;
        }
      })
    } else if (this.mode === 'edit' && this.$route.query.time === 'later') {
      this.placesLater.forEach((el, index) => {

        if (el.id === this.newPlace.id) {
          el.name = this.newPlace.name;
          el.description = this.newPlace.description;
          el.imageUrl = this.newPlace.imageUrl;
        }
      })

    } else if (this.mode === 'create' && this.$route.query.time === 'now') {
      this.placesNow.push(this.newPlace);
    }  else if (this.mode === 'create' && this.$route.query.time === 'later') {
      this.placesLater.push(this.newPlace);
    }
    localStorage.setItem('placesNow', JSON.stringify(this.placesNow));
    localStorage.setItem('placesLater', JSON.stringify(this.placesLater));
    
    this.mode = '';
    this.close();
  };

  private onFileChange(e: File): void {
    var files = e;
    console.log(e)

    this.createImage(files)
  }

  private createImage(file: File): void {
    var reader = new FileReader()
    var vm = this

    reader.onload = (e) => {
      console.log(e);
      
      if (e?.target?.result) {
        vm.newPlace.imageUrl = e?.target?.result.toString();
        console.log(vm.userImage);
        
      }
    }
    reader.readAsDataURL(file)
  };

  render() {
    return (
      <div class={styles['card-container']}>
        {this.renderCardsNode()}
        <VBtn
          color="blue darken-2"
          dark
          fab
          right
          bottom
          absolute
          class={styles['fab-btn']}
          onClick={this.addPlace}
        >
          <VIcon>
            mdi-plus
          </VIcon>
        </VBtn>

        <VDialog
          v-model={this.dialog}
          max-width="700px"
          scrollable={true}
        //TODO: Add details to dialog form
        >
          <VCard>
            <VCardTitle>
              <span class="text-h5">Add place</span>
            </VCardTitle>

            <VCardText
              class={styles['places-dialogText']}
            >
              <VContainer>
                <VRow>
                  <VCol
                    cols="auto"
                    class={styles['note-textarea']}
                  >
                    <VTextField
                      v-model={this.newPlace.name}
                      label="Name"
                    ></VTextField>
                  </VCol>
                </VRow>
                <VRow>
                  <VCol>
                  <VTextarea
                    v-model={this.newPlace.description}
                    label="Description"
                  ></VTextarea>
                  </VCol>
                </VRow>
                <VRow>
                  <VCol>
                  <VFileInput
                      onChange={(e: File) => this.onFileChange(e)}
                      label="File input"
                      filled
                      prepend-icon="mdi-camera"
                    >
                    </VFileInput>
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
  };

  private renderCardsNode(): Array<VNode> | VNode | undefined {

    if (this.$route.query.time === 'now' && this.placesNow.length) {
      return (
      <VRow>
        { this.placesNow.map((it) => {
        return this.renderCardNode(it);
        }) }
      </VRow>
      )

    } else if (this.$route.query.time === 'later' && this.placesLater.length) {
      return (
        <VRow>
          { this.placesLater.map((it) => {
          return this.renderCardNode(it);
          }) }
        </VRow>
        )
    }

    return (
      <VCard flat>
        <VCardText>Добавьте свою первую карточку места</VCardText>
      </VCard>
    )
  };

  private renderCardNode(it: Place): VNode {
    return (
      <VCol
        cols="auto"
      >
        <VCard>
          <VImg
            height={250}
            width={250}
            src={it.imageUrl}
            aspect-ratio="1"
          ></VImg>
          <VCardTitle>{it.name}</VCardTitle>
          <VCardText>{it.description}</VCardText>
          <VCardActions class={styles['card-actions']}>
            <VBtn
              color="deep-purple lighten-2"
              text
              onClick={() => { this.editCard(it) }}
            >
              Edit
            </VBtn>
            <VBtn
              color="pink lighten-2"
              text
              onClick={() => { this.deleteCard(it) }}
            >
              Delete
            </VBtn>
          </VCardActions>
        </VCard>
      </VCol>
    )
  };

  private editCard(card: Place): void {
    this.newPlace = { ...card };
    this.dialog = true;

    this.mode = 'edit';
  };

  private deleteCard(card: Place): void {
    this.mode = 'delete';
    
    if (this.$route.query.time === 'now') {
      this.placesNow = this.placesNow.filter(el => 
        el.id !== card.id
      )
    } else if (this.$route.query.time === 'later') {
      this.placesLater = this.placesLater.filter(el => 
        el.id !== card.id
      )
    }
    this.save();
  };
}

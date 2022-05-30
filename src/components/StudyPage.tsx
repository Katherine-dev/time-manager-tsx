import { VNode } from 'vue';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { VBtn, VCalendar, VCard, VCardActions, VCardText, VCardTitle, VCheckbox, VCol, VContainer, VDialog, VRow, VSheet, VSpacer, VMenu, VTextField, VTimePicker } from 'vuetify/lib';
import { VueComponent } from '../shims-vue';


import styles from './StudyPage.css?module';

interface Weekday {
  text: string,
  value: Array<number>
}

interface MyEvent {
  name: string,
  start: Date,
  end: Date,
  color: string,
  timed: boolean,
}

@Component
export default class StudyPage extends VueComponent {
  //data
  private value: string = '';
  private weekdays: Weekday = { text: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0] };
  private colors: Array<string> = ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'];
  private events: Array<MyEvent> = [
    {
      name: 'cxcx',
      start: new Date('2022-05-30T01:24:00'),
      end: new Date('2022-05-30T03:24:00'),
      color: this.colors[0],
      timed: true,
    }
  ];
  private dialog: boolean = false;
  private isActiveTimeMenu: boolean = false;
  private timeStart: Date = new Date();
  private newEvent: MyEvent = {
    name: '',
    start: new Date(),
    end: new Date(),
    color: this.colors[Math.floor(Math.random() * (this.colors.length + 1))],
    timed: false,
  };
  private defaultEvent: MyEvent = {
    name: '',
    start: new Date(),
    end: new Date(),
    color: this.colors[Math.floor(Math.random() * (this.colors.length + 1))],
    timed: false,
  };

  //methods
  private saveTime(): void {
    // @ts-expect-error method exist
    this.$refs.menu.save(this.timeStart);

  }

  private get setTimeNode(): VNode|undefined {
    if (this.newEvent.timed) {
      return (
        <VRow>
          <VCol
            cols="auto"
            class={styles['note-textarea']}
          >
            <VMenu
              ref="menu"
              v-model={this.isActiveTimeMenu}
              close-on-content-click={false}
              nudge-right={40}
              return-value={this.timeStart}
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
              scopedSlots={{
                activator: ({on, attrs} : {on: any, attrs: any}) => 
                <VTextField
                v-model={this.timeStart}
                label="Picker in menu"
                prepend-icon="mdi-clock-time-four-outline"
                readonly
                v-bind={attrs}
                on={on}
              ></VTextField>
              }}
            >
              {this.timePickerNode()}
            </VMenu>
          </VCol>
        </VRow>
      )
    }
  };

  private timePickerNode() {
    if (this.isActiveTimeMenu) {
      return (
        <VTimePicker
          v-model={this.timeStart}
          full-width
        ></VTimePicker>
      )
    }

  }

  private getEventColor(event: MyEvent): string {
    return event.color
  };

  private close(): void {
    this.dialog = false;
    this.$nextTick(() => {
      this.newEvent = Object.assign({}, this.defaultEvent);
    })
  };

  private save(): void {
    this.events.push(this.newEvent);
    localStorage.setItem('events', JSON.stringify(this.events));

    this.close();
  };

  private addEvent(): void {
    this.dialog = true;
  }

  render() {
    return (
      <div>
        <VBtn
          class="ma-2"
          outlined
          color="indigo"
          onClick={this.addEvent}
        >
          Add event
        </VBtn>

        <VSheet height="600">
          <VCalendar
            ref="calendar"
            v-model={this.value}
            weekdays={[1, 2, 3, 4, 5, 6, 0]}
            type="week"
            events={this.events}
            event-overlap-mode="stack"
            event-overlap-threshold="30"
            event-color={this.getEventColor}
          // onChange={() => {this.getEvents({'30.05.2022', '5.06.2022'})}}
          ></VCalendar>
        </VSheet>

        <VDialog
          v-model={this.dialog}
          max-width="500px"
        >
          <VCard>
            <VCardTitle>
              <span class="text-h5">Add event</span>
            </VCardTitle>

            <VCardText>
              <VContainer>
                <VRow>
                  <VCol
                    cols="auto"
                    class={styles['note-textarea']}
                  >
                    <VTextField
                      v-model={this.newEvent.name}
                      label="Name"
                    ></VTextField>
                  </VCol>
                </VRow>
                <VRow>
                  <VCol
                    cols="auto"
                    class={styles['note-textarea']}
                  >
                    <VCheckbox
                      v-model={this.newEvent.timed}
                      label='Добавить время'
                    ></VCheckbox>
                  </VCol>
                </VRow>
                {this.setTimeNode}
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

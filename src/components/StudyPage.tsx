import { VNode } from 'vue';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { VBtn, VCalendar, VCard, VCardActions, VCardText, VCardTitle, VCheckbox, VCol, VContainer, VDialog, VRow, VSheet, VSpacer, VMenu, VTextField, VTimePicker, VFabTransition, VIcon } from 'vuetify/lib';
import { VueComponent } from '../shims-vue';


import styles from './StudyPage.css?module';

interface Weekday {
  text: string,
  value: Array<number>
}

interface MyEvent {
  name: string,
  start: Date | null,
  end: Date | null,
  color: string,
  timed: boolean,
}

@Component
export default class StudyPage extends VueComponent {
  //data
  private value: string = '';
  private colors: Array<string> = ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'];
  private dialog: boolean = false;
  private isActiveTimeMenuStart: boolean = false;
  private isActiveTimeMenuEnd: boolean = false;
  private dateStart: string = '';
  private timeStart: Date | null = null;
  private timeEnd: Date | null = null;

  private events: Array<MyEvent> = [
    {
      name: 'cxcx',
      start: new Date('2022-05-30T13:24'),
      end: new Date('2022-05-30T14:24'),
      color: this.colors[0],
      timed: true,
    }
  ];

  private newEvent: MyEvent = {
    name: '',
    start: null,
    end: null,
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

  mounted(): void {
    const localNotes = localStorage.getItem('events');
    // console.log(localNotes)
    if (localNotes) {
      this.events = JSON.parse(localNotes);
      console.log(this.events[0].start?.toString())
      this.events.forEach(el => {
        if (el.start) {
          el.start = new Date(el.start?.toString().slice(0,16));
        }
        if (el.end) {
          el.end = new Date(el.end?.toString().slice(0,16));
        }
      })
    } else {
      const parsed = JSON.stringify(this.events);
      
      localStorage.setItem('events', parsed);
    }
  };

  //methods
  private saveTime(): void {
    // @ts-expect-error method exist
    this.$refs.menu.save(this.timeStart);
    let partsDate = this.dateStart.split('.');
    let partsTime = this.timeStart?.toString().split(':');
    if (partsTime?.length) {
      this.newEvent.start = new Date(Number(partsDate[2]), Number(partsDate[1]) - 1, Number(partsDate[0]), Number(partsTime[0]), Number(partsTime[1]));
    }
    partsTime = this.timeEnd?.toString().split(':');

    if (partsTime?.length) {
      this.newEvent.end = new Date(Number(partsDate[2]), Number(partsDate[1]) - 1, Number(partsDate[0]), Number(partsTime[0]), Number(partsTime[1]));
    }
  }

  private setTimeNode(value: string): VNode | undefined {
    if (this.newEvent.timed && value === 'start') {
      return (
        <VCol
          cols="auto"
          class={styles['note-textarea']}
        >
          <VMenu
            ref="menu"
            v-model={this.isActiveTimeMenuStart}
            close-on-content-click={false}
            nudge-right={40}
            return-value={value}
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
            scopedSlots={{
              activator: ({ on, attrs }: { on: any, attrs: any }) =>
                <VTextField
                  v-model={this.timeStart}
                  label="Start Time"
                  prepend-icon="mdi-clock-time-four-outline"
                  readonly
                  {...attrs}
                  on={on}
                ></VTextField>
            }}
          >
            {this.timePickerNode(value)}
          </VMenu>
        </VCol>
      )
    } else if (this.newEvent.timed && value === 'end') {
      return (
        <VCol
          cols="auto"
          class={styles['note-textarea']}
        >
          <VMenu
            ref="menu"
            v-model={this.isActiveTimeMenuEnd}
            close-on-content-click={false}
            nudge-right={40}
            return-value={value}
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
            scopedSlots={{
              activator: ({ on, attrs }: { on: any, attrs: any }) =>
                <VTextField
                  v-model={this.timeEnd}
                  label="End Time"
                  prepend-icon="mdi-clock-time-four-outline"
                  readonly
                  {...attrs}
                  on={on}
                ></VTextField>
            }}
          >
            {this.timePickerNode(value)}
          </VMenu>
        </VCol>
      )
    }
  };

  private timePickerNode(value: string): VNode | undefined {
    if (value === 'start') { 
      return (
        <VTimePicker
          v-model={this.timeStart}
          full-width
          onChange={this.saveTime}
          format="24hr"
        ></VTimePicker>
      )
    } else if (value === 'end') { 
      return (
        <VTimePicker
          v-model={this.timeEnd}
          full-width
          onChange={this.saveTime}
          format="24hr"
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
      <div class={styles.fullHeight}>
        <VFabTransition>
          <VBtn
            class={styles['fab-btn']}
            dark
            absolute
            fab
            bottom
            right
            color="indigo"
            onClick={this.addEvent}
          >
            <VIcon> mdi-clock-edit-outline </VIcon>
          </VBtn>
        </VFabTransition>
        <VSheet class={styles.fullHeight}>
          <VCalendar
            ref="calendar"
            v-model={this.value}
            weekdays={[1, 2, 3, 4, 5, 6, 0]}
            type="week"
            events={this.events}
            event-overlap-mode="stack"
            event-overlap-threshold="30"
            event-color={this.getEventColor}
            onClick={(e) => this.whenClickOnEvent(e)}
          // onChange={() => {this.getEvents({'30.05.2022', '5.06.2022'})}}
          ></VCalendar>
        </VSheet>

        <VDialog
          v-model={this.dialog}
          max-width="700px"
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
                <VRow>
                  <VCol
                    cols="auto"
                    class={styles['note-textarea']}
                  >
                    <VTextField
                      v-model={this.dateStart}
                      label="Date"
                    ></VTextField>
                  </VCol>
                </VRow>
                <VRow>
                  {this.setTimeNode('start')}
                  {this.setTimeNode('end')}
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

  private whenClickOnEvent(e: Event): void {
    console.log(e)
  }
}

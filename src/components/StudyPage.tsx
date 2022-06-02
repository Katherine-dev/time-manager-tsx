import { VNode } from 'vue';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { VBtn, VCalendar, VCard, VCardActions, VCardText, VCardTitle, VCheckbox, VCol, VContainer, VDialog, VRow, VSheet, VSpacer, VMenu, VTextField, VTimePicker, VFabTransition, VIcon, VToolbar, VToolbarTitle } from 'vuetify/lib';
import { VueComponent } from '../shims-vue';


import styles from './StudyPage.css?module';

interface CalendarEvent {
  color: string,
  name: string,
  details: string,
}

interface MyEvent {
  id: number,
  name: string,
  start: Date | number | null,
  end: Date | number | null,
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
  private selectedElement: EventTarget | null = null;
  private selectedOpen: boolean = false;
  private mode: string = '';

  private events: Array<MyEvent> = [
    {
      id: 1,
      name: 'cxcx',
      start: new Date('2022-05-30T13:24').getTime(),
      end: new Date('2022-05-30T14:24').getTime(),
      color: this.colors[0],
      timed: true,
    }
  ];

  private newEvent: MyEvent = {
    id: 0,
    name: '',
    start: null,
    end: null,
    color: this.colors[Math.floor(Math.random() * (this.colors.length + 1))],
    timed: false,
  };

  private defaultEvent: MyEvent = {
    id: 0,
    name: '',
    start: new Date(),
    end: new Date(),
    color: this.colors[Math.floor(Math.random() * (this.colors.length + 1))],
    timed: false,
  };

  private selectedEvent: MyEvent = {
    id: 0,
    name: '',
    start: null,
    end: null,
    color: this.colors[Math.floor(Math.random() * (this.colors.length + 1))],
    timed: false,
  };

  mounted(): void {
    const localNotes = localStorage.getItem('events');
    if (localNotes) {
      this.events = JSON.parse(localNotes);
      this.events.forEach(el => {
        if (el.start) {
          el.start = new Date(el.start);
        }
        if (el.end) {
          el.end = new Date(el.end);
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
      this.newEvent.start = new Date(Number(partsDate[2]), Number(partsDate[1]) - 1, Number(partsDate[0]), Number(partsTime[0]), Number(partsTime[1])).getTime();
    }
    partsTime = this.timeEnd?.toString().split(':');

    if (partsTime?.length) {
      this.newEvent.end = new Date(Number(partsDate[2]), Number(partsDate[1]) - 1, Number(partsDate[0]), Number(partsTime[0]), Number(partsTime[1])).getTime();
    }

    if (this.mode !== 'edit') {
      this.newEvent.id = this.events.length + 1;
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
    this.mode = '';

    this.$nextTick(() => {
      this.newEvent = Object.assign({}, this.defaultEvent);
      this.dateStart = '';
      this.timeStart = null;
      this.timeEnd = null;
    })
  };

  private save(): void {

    if (this.mode === 'edit') {
      this.events.forEach((el, index) => {
        console.log(el.id, this.newEvent.id);

        if (el.id === this.newEvent.id) {
          el.name = this.newEvent.name;
          el.start = this.newEvent.start;
          el.end = this.newEvent.end;
          el.timed = this.newEvent.timed;
        }
      })
    } else if (this.mode === 'create') {
      this.events.push(this.newEvent);
    }
    localStorage.setItem('events', JSON.stringify(this.events));
    
    this.mode = '';
    this.close();
  };

  private addEvent(): void {
    this.dialog = true;
    this.mode = 'create';
  }

  render() {
    let listeners = {
      'click:event': this.showEvent
    }
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
            {...{ on: listeners }}
          // onChange={() => {this.getEvents({'30.05.2022', '5.06.2022'})}}
          ></VCalendar>

          <VMenu
            v-model={this.selectedOpen}
            close-on-content-click={false}
            activator={this.selectedElement}
            offset-x
          >
            <VCard
              color="grey lighten-4"
              min-width="350px"
              flat
            >
              <VToolbar
                color={this.selectedEvent.color}
                dark
              >
                <VBtn
                  icon
                  onClick={this.editEvent}
                >
                  <VIcon>mdi-pencil</VIcon>
                </VBtn>
                <VToolbarTitle domPropsInnerHTML={this.selectedEvent.name}></VToolbarTitle>
                <VSpacer></VSpacer>
              </VToolbar>
              <VCardText>
                <span domPropsInnerHTML={this.selectedEvent.details}></span>
              </VCardText>
              <VCardActions class={styles['card-actions']}>
                <VBtn
                  text
                  color="secondary"
                  onClick={() => { this.selectedOpen = false }}
                >
                  Cancel
                </VBtn>
                <VBtn
                  text
                  color="red"
                  class={styles['delete-button']}
                  onClick={this.deleteEvent}
                >
                  Delete
                </VBtn>
              </VCardActions>
            </VCard>
          </VMenu>
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

  private showEvent({ nativeEvent, event }: { nativeEvent: Event, event: MyEvent }): void {
    const self = this;

    const open = () => {
      self.selectedEvent = event
      this.selectedElement = nativeEvent.target
      requestAnimationFrame(() => requestAnimationFrame(() => self.selectedOpen = true))
    }

    if (this.selectedOpen) {
      this.selectedOpen = false
      requestAnimationFrame(() => requestAnimationFrame(() => open()))
    } else {
      open()
    }

    nativeEvent.stopPropagation()
  };

  private editEvent(): void {
    this.newEvent = { ...this.selectedEvent };
    this.dialog = true;

    if (this.newEvent.start && this.newEvent.end) {
      this.dateStart = new Date(this.newEvent.start).toISOString().slice(0, 10);

      let partsDate = this.dateStart.split('-');
      this.dateStart = partsDate.reverse().join('.');

      this.timeStart = new Date(this.newEvent.start);
      this.timeEnd = new Date(this.newEvent.end);

    }
    this.mode = 'edit';
  }

  private deleteEvent(): void {
    this.mode = 'delete';
    const self = this;
    this.events = this.events.filter(el => 
      el.id !== self.selectedEvent.id
    )
    
    this.selectedOpen = false;
    this.save();
  }
}

<template>
    <div class="field p-fluid">
        <label>{{ label }}</label>
        <VueDatePicker
            v-model="pickerDate"
            :year-picker="setMode === 'year'"
            :month-picker="setMode === 'month'"
            :time-picker="setMode === 'time'"
            :week-picker="setMode === 'week'"
            :range="useRange"
            :format="format"
            :model-type="compuedModelType"
            :month-change-on-scroll="useMonthScroll"
            :auto-apply="useAutoApply"
            :placeholder="placeholder"
            :no-today="noDisplayTodayMark"
            :disabled="disabled"
            :readonly="readonly"
            :action-row="{
                showNow: showToday,
                showPreview: showPreview,
                showCancel: showCancel,
                showSelect: showSelect,
            }"
            :year-first="showYearFirst"
            :partial-range="computedPartialRange"
            :min-range="minRange"
            :max-range="maxRange"
            :multi-calendars="useMultiCalendars"
            :locale="setLocale"
            :select-text="selectText"
            :cancel-text="cancelText"
            :now-button-label="todayText"
            :day-names="customDayNames"
            :enable-time-picker="useTimepicker"
            :year-range="[2000, 2100]"
            :clearable="false"
            :start-date="setStartDate"
            :disabled-week-days="computedDisableWeekDays"
        ></VueDatePicker>
    </div>
</template>
<script setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import { computed, ref, watch } from 'vue';
/** date-picker v-model 연동용 변수 */
let pickerDate = ref();
/**
 * label 설명라벨
 * format 날짜포멧 지정 ('yyyy-MM-dd', 'yyyy-MM', 'yyyy')
 * useMonthScroll 마우스 스크롤을 사용한 월 단위 이동 사용여부
 * useClear clear버튼 사용여부 (true,false)
 * useRange 날짜 범위로 지정하는 옵션 설정 (true,false)
 * useAutoApply select버튼 없이 날짜로 바로 선택하는 기능 사용 (true,false)
 * placeholder input박스 placeholder 지정
 * noDisplayTodayMark 현재일 표시 date-picker에 표시 여부 (true,false)
 * disabled disabled 적용 (true,false)
 * readonly readonly 적용 (true,false)
 * showToday today버튼 표시여부 (true,false)
 * showPreview 미리보기 정보 표시 여부 (true,false)
 * showSelect select버튼 표시여부 (true,false)
 * showCancel cancel버튼 표시여부 (true,false)
 * showYearFirst 년월형태로 표시여부 (true,false)
 * minRange useRange 사용시(날짜2개 선택시) 최소 범위 지정 (Number)
 * maxRange useRange 사용시(날짜2개 선택시) 최대 범위 지정 (Number)
 * useMultiCalendars 멀티 캘린더 형태로 사용여부 (true,false)
 * setMode 특정형태의 모습을 보여줄때 사용 (year,month,week,time)
 * setLocale 달력 locale 설정 (String)
 * selectText select버튼 텍스트 설정 (String)
 * cancelText cancel버튼 텍스트 설정 (String)
 * todayText today버튼 텍스트 설정 (String)
 * customDayNames 표시되는 이름 변경옵션 ex) 기존 ko일때 커스터마이징 하던것과 동일함 ['월','화','수','목','금','토','일']
 * useTimepicker timepicker 사용여부 (time단위까지 입력필요할시 format형태도 추가 필요함.) (true,false)
 * setStartDate date-picker 보여지는 날짜 지정
 * setDisableWeekDays 특정 요일만 선택못하게 하는경우 사용 (Array) ex) ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
 *
 */
let props = defineProps({
    label: { Type: String, default: '' },
    format: {
        Type: String,
        default: 'yyyy-MM-dd',
        validator(value) {
            const allowedFormats = ['yyyy-MM-dd', 'yyyy-MM', 'yyyy'];
            if (!allowedFormats.includes(value)) {
                console.warn(`Invalid format: ${value}. one of 'yyyy-MM-dd', 'yyyy-MM', 'yyyy'`);
                return false;
            }
            return true;
        },
    },
    useMonthScroll: { Type: Boolean, default: true },
    useClear: { Type: Boolean, default: true },
    useRange: { Type: Boolean, default: false },
    useAutoApply: { type: Boolean, default: true },
    placeholder: { type: String },
    noDisplayTodayMark: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    showToday: { type: Boolean, default: true },
    showPreview: { type: Boolean, default: false },
    showSelect: { type: Boolean, default: true },
    showCancel: { type: Boolean, default: true },
    showYearFirst: { type: Boolean, default: true },
    minRange: { type: Number, default: 0 },
    maxRange: { type: Number, default: 60 },
    useMultiCalendars: { type: Boolean, default: false },
    setMode: { type: String, default: '' },
    setLocale: { type: String, default: 'ko' },
    selectText: { type: String, default: 'Select' },
    cancelText: { type: String, default: 'Cancel' },
    todayText: { type: String, default: 'today' },
    customDayNames: { type: Array },
    useTimepicker: { type: Boolean, default: false },
    setStartDate: { type: Date, default: new Date() },
    setDisableWeekDays: { type: Array, default: () => [] }, // 기본값 설정
});
let emits = defineEmits(['update:modelValue']);
/**
 * range를 사용할때는 1개만 선택하면 안되는모드 지정.
 */
const computedPartialRange = computed(() => {
    if (props.useRange) {
        return false;
    }
    return true;
});
/**
 * format에 지정된 형식을 따라간다.
 * @type {ComputedRef<any>}
 */
const compuedModelType = computed(() => {
    return props.format;
});
/**
 * 특정 요일 지정 불가능 옵션값으로 변경처리
 * @type {ComputedRef<*>}
 */
const computedDisableWeekDays = computed(() => {
    return (props.setDisableWeekDays || []).map((item) => {
        return changeDisableWeekDays(item);
    });
});

/**
 * vue-date-picker에 명시된 값으로 변경처리
 * Sunday --> 0
 * Monday --> 1
 * Tuesday --> 2
 * Wednesday --> 3
 * Thursday --> 4
 * Friday --> 5
 * Saturday --> 6
 * @param item
 * @returns {number}
 */
function changeDisableWeekDays(item) {
    switch (item) {
        case 'Sunday':
            return 0;
            break;
        case 'Monday':
            return 1;
            break;
        case 'Tuesday':
            return 2;
            break;
        case 'Wednesday':
            return 3;
            break;
        case 'Thursday':
            return 4;
            break;
        case 'Friday':
            return 5;
            break;
        case 'Saturday':
            return 6;
            break;
        default:
            return -1; // 예외 처리
    }
}
/**
 * vue-date-picker에 연결한 pickerDate 값이 바뀌면 전달받은 v-model에 값 연결
 */
watch(pickerDate, (newValue, oldValue) => {
    emits('update:modelValue', newValue);
});
</script>
<style>
.field.p-fluid input {
  border: none !important; /* 테두리 없애기 */
  box-shadow: none !important; /* 그림자 없애기 */
  outline: none !important; /* 아웃라인 없애기 */
}
</style>

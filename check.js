// check.js — 브라우저 없이 규칙 확인하기. P6 에서 채우고 P7 에서 한 번 더 늘립니다.
//
// 상황: 규칙이 맞는지 매번 브라우저를 열고 표를 눈으로 대 보기는 번거롭고, 빠뜨리기 쉽습니다.
// 할 일: 손으로 만든 daily 로 logic.js 의 함수를 불러 console.log 합니다.
//       console.log 줄마다 오른쪽에 예상 결과를 주석으로 "실행하기 전에" 적습니다.
// 실행: 터미널에서 node check.js
// 확인: 출력이 주석의 예상과 전부 같습니다.
// 커밋 메시지: p6: check (P7 에서 늘린 것은 p7: reasons 에 같이)
import { toDays, isGoodDay, summarize, reasons } from "./logic.js";

const limits = {rain: 30, wind: 10};

const daily = {
    time: ["11-21", "11-22", "11-23", "11-24"],
    temperature_2m_max: [15, 16, 14, 13],
    precipitation_probability_max: [10, 31, 10, 57],
    wind_speed_10m_max: [5, 5, 15, 11.2]
};

const days = toDays(daily);
//toDays의 첫째 날 객체
console.log(days[0]); //{date: '2026-11-21}, max: 15, wind: 5, rain: 10}

//각 날의 isGoodDay 결과
console.log(isGoodDay(days[0], limits)); //true (강수 10, 풍속 5 - 둘 다 기준 미만)
console.log(isGoodDay(days[1], limits)); //false (강수 31, 풍속 5 - 강수 기준 초과)
console.log(isGoodDay(days[2], limits)); //flase (강수 10. 풍속 15 - 풍속 기준 초과)
console.log(isGoodDay(days[3], limits)); //false (강수 57, 풍속 11.2 - 둘 다 기준 초과)

//그 날들의 summarize 결과
console.log(summarize(days, limits)); // "good fot a run on 1 of 4 days"

//빈 배열[]의 summarize 결과
console.log(summarize([], limits)); // "good for a run on 0 of 0 days"

//reasons 결과 검증
console.log(reasons(days[0], limits)); // [] (둘 다 기준 이하)
console.log(reasons(days[1], limits)); // ["rain"] (강수만 기준 초과)
console.log(reasons(days[2], limits)); // ["wind"] (풍속만 기준 초과)
console.log(reasons(days[3], limits)); // ["rain", "wind"] (둘 다 기준 초과)
/**
 * Graft JS
 */
declare class Graft extends GraftExtends {
    /** Graft 생성자 */
    constructor(proc?: (self: Graft)=> void);
    /**
     * Graft 인스턴스를 반환 합니다. 인스턴스는 싱글톤으로 제공 됩니다.
     * @param proc 객체 생성시 호출 되는 함수, 매개변수로 생성된 객체의 인스턴스를 전달 합니다.
     */
    static getInstance(proc?: (self: Graft)=> void): Graft;
    /**
     * 자바스크립트 모듈을 추가 합니다.
     * @param proc 스크립트 URL정보, 다건 추가시 배열로 입력
     */
    static import(url: string| Array<string>): Promise<void>;
    /** 네이티브 부터 메시지를 수신 합니다. */
    static postMessage(msg: GraftBridgeMessage);

    /** 로깅 처리를 관리 합니다. */
    get log(): GraftLog;
    /** 유틸리티 */
    get utils(): GraftUtils;
    /** 뷰 제어 함수 컬렉션 */
    get ctrl(): {[k: string]: GraftController};
    /** 뷰 컬렉션 */
    get view(): {[k: string]: GraftElement};
    /**
     * 메소드에 매칭되는 태그 엘리먼트를 생성 하며,
     * 전달 인자 타입별에 따라 기능을 수행 합니다.
     * - `string | number`: 엘리먼트의 HTML 마크업을 랜더링 합니다.<br/>
     * - `function`: 엘리먼트 생성 초기화 함수 입니다.<br/>
     * - `object`: 엘리먼트 속성을 세팅 합니다.<br/>
     * - `array`: 엘리먼트에 서브 엘리먼트를 추가 합니다.<br/>
     */
    get tag(): GraftHtmlTag;
    /** HTML 도큐먼트를 관리 합니다. */
    get html(): GraftHtml;
    /** 프로세스 진행을 보류/관리 합니다. */
    get suspend(): GraftSuspend;
    /** 네이티브와 메시지를 주고 받는 역할을 합니다. */
    get bridge(): GraftBridge;

    /**
     * 어플리케이션의 고유 프로세스를 진행 할 수 있는 기능을 제공 합니다.
     * @param {function} proc (self: {@link Graft})=> void<br/>
     * 수행 프로시저로 매개변수로 생성된 객체의 인스턴스를 전달 합니다.
     */
    exec(proc: (self: Graft)=> void);
    /**
     * 설정 시간 동안 대기 후 생성된 인스턴스를 반환 합니다.
     * @param wait 대기시간을 밀리초단위로 입력
     */
    build(wait?: number= 50): Promise<Graft>;
};

type GraftBridgeMessage= {
    /** 네이트브로 전달 할 기능 명령어 */
    command?: string;
    /** 네이트브로 전달 할 파라미터 */
    payload?: any;
    /** 네이트브에서 받은 결과 */
    receive?: any;
};
type GraftSuspend= {
    /** 프로제스 제어자 등록 여부를 조회 합니다. */
    has(key: any): boolean;
    /** 프로제스 제어자를 등록 및 실행 대기 합니다. */
    run(key: any, onInit?: ()=> void): Promise<any>;
    /** 프로세스 실행 대기를 귀결 처리 합니다. */
    resolve(key: any, receive?: any): void;
    /** 프로세스 실행 대기를 거부 처리 합니다. */
    reject(key: any, reason?: any): void;
};
type GraftBridge= {
    /**네이티브 목객체 */
    mock: {
        set(key: string, proc: (msg: GraftBridgeMessage)=> void);
        postMessage(msg: GraftBridgeMessage);
    };
    /**네이티브 객체를 세팅합니다. */
    setNative(fun: ()=> any);
    /**네이티브에 메시지를 전달 합니다. */
    postMessage(msg: GraftBridgeMessage): Promise<any>;
};
type GraftHtml= {
    /**엘리먼트에 핸들링 객체를 믹스인 합니다. */
    grafting(el: HTMLElement): GraftElement;
    /**도큐먼트 body에 엘리먼트를 삽입 합니다. */
    insert(chile: GraftElement, reference?: GraftElement): GraftElement;
    /**선택자와 일치 하는 첫번째 엘리먼트를 반환 합니다. */
    query(selector: string, target?: GraftElement): GraftElement;
    /**선택자와 일치 하는 모든 엘리먼트를 배열로 반환 합니다. */
    queryAll(selector: string, target?: GraftElement): Array<GraftElement>;
};
type GraftElement= (HTMLElement| HTMLInputElement) & {lot: GraftElementLot};
type GraftController= ((it: GraftElement)=> void) & {getView(): GraftElement};
type GraftElementLot= {
    /**사용자 데이터 저장 */
    data: any;
    /**엘리먼트 TEXT 입/출력 */
    text: string;
    /**엘리먼트 HTML 마크업 레더링 */
    html: string;
    /**엘리먼트 Form컨트롤 VALUE값 */
    value: string| Array<string>;
    /**엘리먼트 CLASS 관리 */
    css: {
        /**클래스 검색 */
        has(name: string): boolean;
        /**클래스 추가 */
        add(name: string| Array<string>): GraftElementLot.css;
        /**클래스 삭제 */
        remove(name: string| Array<string>): GraftElementLot.css;
    };
    /**서브 클래스 추가, 레퍼런스 객체 주입시 앞에 추가 */
    insert(chile: GraftElement, reference?: GraftElement): GraftElement;
    /**엘리먼트를 비웁니다. */
    truncate(): GraftElementLot;
    /**이벤트 등록 */
    event<K extends keyof HTMLElementEventMap>(type: K, listener: (ev: HTMLElementEventMap[K])=> any): GraftElementLot;
    /**등록된 이벤트 삭제 */
    removeEvent(): GraftElementLot;
    /**`data-bind` 지시자로 바인딩된 엘리먼트 콜렉션객체 반환 */
    dataBind(): GraftElementLotBind;
};
type GraftElementLotBind= {
    [k: string]: GraftElement;
    setText(vl: {[k: string]: string});
    getText(): {[k: string]: string};
    setHtml(vl: {[k: string]: string});
    getHtml(): {[k: string]: string};
    setValue(vl: {[k: string]: string| Array<string>});
    getValue(): {[k: string]: string| Array<string>};
};
type GraftHtmlTag= {
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    [tag: string]: (...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void))=> GraftElement;

    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    a(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    area(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    article(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    audio(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    b(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    br(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    button(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    canvas(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    caption(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    code(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    col(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    colgroup(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    dd(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    div(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    dl(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    dt(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    em(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    embed(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    footer(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    form(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    h1(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    h2(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    h3(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    h4(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    h5(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    h6(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    header(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    hr(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    i(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    iframe(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    img(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    input(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    ins(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    label(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    li(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    link(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    main(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    map(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    nav(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    object(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    ol(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    option(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    p(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    pre(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    section(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    select(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    small(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    span(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    strong(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    sub(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    summary(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    svg(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    table(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    tbody(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    td(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    template(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    textarea(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    tfoot(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    th(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    thead(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    tr(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    u(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    ul(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
    /** 엘리먼트 생성 `string|number`:HTML, `object:`속성, `function:`초기화 함수 */
    video(...arg: string|number|Array<GraftElement>|((_it: GraftElement)=> void)): GraftElement;
};
type GraftUtils= {
    /**
     * 데이터 값의 복사본을 반환 합니다.
     * @param vl 데이터
     */
    clone(vl: any): any;
    /**
     * 카멜/파스칼 케이스를 케밥(xxx-xxx) 케이스로 변환 합니다.
     * @param text 변환 대상 문자열
     * @param toUpper 대/소문자 구분으로 미입력시 소문자로 변환(기본값: false)
     */
    kebabCase(text: string, toUpper:boolean= false): string;
    /**
     * 카멜/파스칼 케이스를 스네이크(xxx_xxx) 케이스로 변환 합니다.
     * @param text 변환 대상 문자열
     * @param toUpper 대/소문자 구분으로 미입력시 소문자로 변환(기본값: false)
     */
    snakeCase(text: string, toUpper:boolean= false): string;
    /**
     * 스네이크/케밥 케이스를 카멜(xxxXxx) 케이스로 변환 합니다.
     * @param text 변환 대상 문자열
     */
    camelCase(text: string): string;
    /**
     * 스네이크/케밥 케이스를 파스칼(XxxXxx) 케이스로 변환 합니다.
     * @param text 변환 대상 문자열
     */
    pascalCase(text: string): string;
};
type GraftLog= {
    /**
     * 로그 출력을 활성화 합니다.
     * @param level 'debug' 입력 시 debug 로그 출력
     */
    active(level?: 'debug'): void;
    /**
     * 로그 새로고침
     */
    refresh(): void;
    /**
     * 디버그 로그를 출력 합니다.
     * @param args 출력 전달 매개변수
     */
    debug(...args: any): void;
    /**
     * 콘솔 로그를 출력 합니다.
     * @param args 출력 전달 매개변수
     */
    out(...args: any): void;
    /**
     * 로그 객체를 반환 합니다.
     * @param label 로그 라벨
     * @param color 컬러 코드
     */
    getLogger(label: string, color?: 'info'| 'primary'| 'danger'| '#000000'): (...optional: any[])=> void;
};

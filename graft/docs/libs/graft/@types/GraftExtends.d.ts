/**
 * Graft 확장자
 */
declare class GraftExtends {
    /**실행 매체 모바일 여부 확인 */
    isMobile: boolean;
    /**JSON 데이터를 요청 합니다. */
    get ajax(): GraftAjax;
    /** 레이어 팝업을 관리 합니다. */
    get popup(): GraftPopup;
}

type GraftPopup= {
    /**
     * 컨트롤러에 팝업 구현체를 믹스인 하여 기능을 확장 합니다.
     * @param ctrl 뷰 컨트롤러 함수
     * @param imp 팝업 메소드 구현제
     */
    mixinController(ctrl: GraftController, imp: GraftPopupInterface): GraftPopupController;
    /**
     * 팝업을 오픈 하며, 귀결 될 때까지 대기 하며, 오픈 할 팝업의 컨트롤러를 인자로 넘겨 줍니다.
     * @param ctrl 팝업 컨트롤러
     */
    open(ctrl: GraftPopupController): Promise<any>;
    /**
     * 팝업 대기를 정상 귀결 시키며, 오픈한 시점으로 되돌려 줍니다.
     * @param ctrl 팝업 컨트롤러
     * @param receive 결과 응답
     */
    resolve(ctrl: GraftPopupController, receive?: any): void;
    /**
     * 팝업 대기를 거부 처리 하며, 오픈한 시점으로 되돌려 줍니다.
     * @param ctrl 팝업 컨트롤러
     * @param reason 거부 사유
     */
    reject(ctrl: GraftPopupController, reason?: any): void;
};
type GraftPopupController= GraftController & GraftPopupInterface;
type GraftPopupInterface= {
    /**
     * 팝업 오픈시 호출되는 함수.
     * @param payload 전달값
     */
    onOpen(payload: any): void;
    /**
     * 팝업 정상 귀결시 호출되는 함수.
     * @param receive 응답값
     */
    onResolve(receive: any): void;
    /**
     * 팝업 거부시 호출되는 함수
     * @param reason 거부사유
     */
    onReject(reason: any): void;
};
type GraftAjax= {
    fetchJson(prm: GraftAjaxParam): Promise<object| Array<any>>;
};
type GraftAjaxParam= {
    /** 요청 URL정보 */
    url: string;
    /** 요청 전달값 */
    payload?: object;
    /** 오류 발생시 메시지 출력 후 이동 될 포커스 */
    focus?: HTMLElement| Event;
};
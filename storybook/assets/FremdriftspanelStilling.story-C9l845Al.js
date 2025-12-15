import{aw as w,T as I,j as t,x as k,S as x,cz as j,cH as b,cG as g,cA as u,X as y,c$ as _}from"./iframe-C1ovTrJQ.js";import{w as m,c as D}from"./ContextDecorators-BrBfLULn.js";import{F as N,A as v}from"./FullførtStilling-Bon2U05c.js";import{R as T}from"./GjenåpneStillingKnapp-B8tTTEh1.js";import{T as A}from"./TilgangskontrollForInnhold-kIjhyj42.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CKGneecr.js";import"./OrganisasjonsnummerAlert-DnBjo3Sr.js";import"./VStack-BODWlaTY.js";import"./BasePrimitive-kfJoC0Sw.js";import"./List-C5fkUS3x.js";import"./Link-B-3pnXuh.js";import"./KandidatHendelseTag-BarwRLK-.js";import"./Tag-C5B9wQUJ.js";import"./ChatExclamationmark-BNNaySzH.js";import"./FileXMark-wrBRLPbV.js";import"./Trash-cvTD7Rhw.js";import"./HandShakeHeart-CIqUKEon.js";import"./Calendar-zxdBpvT8.js";import"./ThumbUp-BzNvvIxt.js";import"./Table-C6jyp0hO.js";import"./index-CKttYGEK.js";import"./index-B40KJ5b4.js";import"./util-sPn1xI8S.js";import"./DatoVelger-CIF0HALY.js";import"./useDatepicker-TIesKIsH.js";import"./useControllableState-B_oB0b42.js";import"./Modal-CZAjlcXE.js";import"./floating-ui.react-DOaaCIa6.js";import"./Date.Input-CMQNmt4o.js";import"./useFormField-QhcwKSrr.js";import"./ChevronDown-DwOp--_B.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-o_MBhyI4.js";import"./Modal.context-BM-QBXBc.js";import"./Popover-BkfV-qBK.js";import"./DismissableLayer-BRnL8OqO.js";import"./startOfMonth-DJnFtpQB.js";import"./Select-DPrdEXBi.js";import"./endOfMonth-CwZr74j2.js";import"./ArrowLeft-CqTDf3wH.js";import"./ArrowRight-B6Th_MLb.js";import"./isSameDay-DYFi4Gr3.js";import"./Checkbox-zJ5eRESw.js";import"./Fieldset-DRYw58ub.js";import"./accordion-CPzDC1Tl.js";import"./index-D3BKqcMN.js";import"./index-Cht2B1De.js";import"./index-BwLpOGCd.js";import"./Box-gnjjIapD.js";import"./Bell-DKiHFDSK.js";import"./PersonChat-BrgJSU6e.js";import"./Eye-C2VVmJwt.js";import"./ProgressBar-DDeRbGNl.js";import"./useLatestRef-D4471ZKH.js";import"./EyeSlash-Cd4xUaSf.js";import"./CircleSlash-B5nmcACb.js";import"./Pencil-xImSgbOF.js";import"./FullførStillingModal-BuvWQLMq.js";import"./PersonbrukerTekst-CpvBgecR.js";import"./ClockDashed-Bf6Z9gBs.js";import"./IkonNavnAvatar-S7umojVe.js";import"./umamiEvents-DSuxYBjR.js";import"./Tasklist-BeHpHTnc.js";import"./ErrorBoundary-D5a7pcTs.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=w(),d=I(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Wt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />)
}`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />)
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => {
    // Lukket kandidatliste og stoppet stilling -> Fullført visning
    const stillingsData = {
      ...mockBaseStilling,
      stilling: {
        ...mockBaseStilling.stilling,
        status: 'INACTIVE',
        publishedByAdmin: mockBaseStilling.stilling.publishedByAdmin || new Date().toISOString()
      }
    } as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      lukket: true,
      antall: 4,
      status: InternKandidatstatus.AKTUELL,
      utfall: KandidatutfallTyper.FATT_JOBBEN,
      stillingsData
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />, liste, stillingsData);
  }
}`,...a.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const stillingsData = mockFormidling as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      stillingsData,
      antall: 2
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />, liste, stillingsData);
  }
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Wt as default};

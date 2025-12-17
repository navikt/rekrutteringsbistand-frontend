import{aw as I,T as w,j as t,x as k,S as x,cz as j,cI as b,cH as g,cA as u,X as y,c$ as _}from"./iframe-D4iOfYdD.js";import{w as m,c as D}from"./ContextDecorators-BE55KfEL.js";import{F as N,A as v}from"./FullførtStilling-CCJaKTGE.js";import{R as T}from"./GjenåpneStillingKnapp-CJoVSCfZ.js";import{T as A}from"./TilgangskontrollForInnhold-DLAph_QF.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-B_Rd8-tX.js";import"./OrganisasjonsnummerAlert-DtL0m1ZZ.js";import"./VStack-DsoS_FVc.js";import"./BasePrimitive-BL-Ca9OH.js";import"./List-Dp0jtzjl.js";import"./Link-HStznqXy.js";import"./KandidatHendelseTag-BzcUvUh0.js";import"./Tag-gwqLe9qG.js";import"./ChatExclamationmark-CVSqQhUX.js";import"./FileXMark-K-7-BXKI.js";import"./Trash-BiSSnaC_.js";import"./HandShakeHeart-OdReNHn-.js";import"./Calendar-CqdmdWZt.js";import"./ThumbUp--sbuRJQq.js";import"./Table-B_yR3vLO.js";import"./index-BSmOzy6Q.js";import"./index-B40KJ5b4.js";import"./util-BnXACK12.js";import"./DatoVelger-DNnavRAX.js";import"./useDatepicker-Bh01TUA4.js";import"./useControllableState-CCn3Haam.js";import"./Modal-B2ceFw9k.js";import"./floating-ui.react-QxC-zopC.js";import"./Date.Input-B1R4kY_r.js";import"./useFormField-DshCtziE.js";import"./ChevronDown-DESslXbj.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-5Htf0mWj.js";import"./Modal.context-Cq1NJ1e2.js";import"./Popover-XCxaJ0uq.js";import"./DismissableLayer-DZiHPteH.js";import"./startOfMonth-D59XWawF.js";import"./Select-D8suP6RG.js";import"./endOfMonth-C7Bq5o8X.js";import"./ArrowLeft-NV9co9sf.js";import"./ArrowRight-DC6NcBtE.js";import"./isSameDay-wVr9SzdM.js";import"./Checkbox-CUU6RjIu.js";import"./Fieldset-BClffpsG.js";import"./accordion-DTswd09s.js";import"./index-YBqJ6I9w.js";import"./index-BwcJTGOh.js";import"./index-DDTT9Xq2.js";import"./Box-CmI7PDFa.js";import"./Bell-ByQDWpd6.js";import"./PersonChat-Dxp5Jdbk.js";import"./Eye-BII8po4-.js";import"./ProgressBar-09fgAVvI.js";import"./useLatestRef-DiUA6Zqh.js";import"./ShieldLock-nWqihrCY.js";import"./PadlockLocked-7MK5M_Cn.js";import"./EyeSlash-_qAjWm6W.js";import"./CircleSlash-CMpxtvaP.js";import"./Pencil-DfFtBN0F.js";import"./FullførStillingModal-BmJJ4Ntc.js";import"./PersonbrukerTekst-BxA78f12.js";import"./ClockDashed-BRXv3lmv.js";import"./IkonNavnAvatar-BM-trhtL.js";import"./umamiEvents-4lZbqD_K.js";import"./Tasklist-Cc7XL8RK.js";import"./ErrorBoundary-CtDus9HP.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const $t={tags:["autodocs"],component:n},o={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},l={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />)
}`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />)
}`,...l.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{o as Aktiv,l as AktivDropdown,p as FormidlingVariant,a as Fullført,$t as default};

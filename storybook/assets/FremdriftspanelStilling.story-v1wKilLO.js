import{aw as w,U as I,j as t,y as k,S as x,cx as j,cF as y,cE as g,cy as u,Y as b,cZ as _}from"./iframe-DQ9jaFGK.js";import{w as m,c as A}from"./ContextDecorators-Bc3DOiS3.js";import{F as N,A as v}from"./FullførtStilling-DexeffhF.js";import{R as T}from"./GjenåpneStillingKnapp-F3zI3LKY.js";import{T as E}from"./TilgangskontrollForInnhold-WUWv0Idn.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CCC2LAFj.js";import"./OrganisasjonsnummerAlert-xlVa5bNe.js";import"./VStack-CMJ94HfX.js";import"./BasePrimitive-Cf9-LRZa.js";import"./List-CZQ4RYE8.js";import"./Link-BuAt7cTQ.js";import"./KandidatHendelseTag-C4zTeyWG.js";import"./Tag-CmBIKPGT.js";import"./ChatExclamationmark-gSzlTHtR.js";import"./FileXMark-CSYk3rQP.js";import"./Trash-Czat1Rnr.js";import"./HandShakeHeart-CdRe9YLa.js";import"./Calendar-qn7P5lxv.js";import"./ThumbUp-mWHy6P4x.js";import"./Table-qqatYIvr.js";import"./index-dEhE5YbD.js";import"./index-B40KJ5b4.js";import"./util-DSzzi24A.js";import"./DatoVelger-D07VMbSL.js";import"./useDatepicker-DchjxDQp.js";import"./useControllableState-BweIuYLw.js";import"./Modal-VZLky371.js";import"./floating-ui.react-Cvkhx2J8.js";import"./Date.Input-B6LpgIQE.js";import"./useFormField-BvSbIY0c.js";import"./ChevronDown-CFJFU5Q5.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-DlE4khJJ.js";import"./Modal.context-B9jifhTW.js";import"./Popover-Bu--SbmU.js";import"./DismissableLayer-CEPiaV-H.js";import"./startOfMonth-9882ld6m.js";import"./Select-a3EIzbK5.js";import"./endOfMonth-j1DAH9UN.js";import"./ArrowLeft-CjxMxiXV.js";import"./ArrowRight-id1gVWlr.js";import"./isSameDay-CTu7tWkm.js";import"./Checkbox-DtiXfEG7.js";import"./Fieldset-DJficm1h.js";import"./accordion-snwBuEPL.js";import"./index-CqP5_tRx.js";import"./index-jB2KsOv-.js";import"./index-BbpNdcVx.js";import"./Box-Dk0z6FlO.js";import"./Bell-BnGfdLAh.js";import"./PersonChat-B7jNQM_L.js";import"./Eye-BTX3Op98.js";import"./ProgressBar-4MwYvxTu.js";import"./useLatestRef-BRu3YlNO.js";import"./EyeSlash-B8ONPUUU.js";import"./CircleSlash-CWzEyrpT.js";import"./Pencil-Cr7vcedS.js";import"./FullførStillingModal-iOYVmUqU.js";import"./PersonbrukerTekst-CiLzbeX2.js";import"./ClockDashed-CcbrYhYb.js";import"./umamiEvents-CYDHrNFb.js";import"./Tasklist-FUeSm7qA.js";import"./ErrorBoundary-CNEB8_70.js";function n({dropDown:r}){const{stillingsData:i,erEier:D}=w(),d=I(i,D),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(E,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(E,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===y.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Wt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=A({lukket:!0,antall:4,status:b.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=A({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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

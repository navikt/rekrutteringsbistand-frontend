import{ax as I,U as w,j as t,y as k,S as x,cz as j,cH as b,cG as g,cA as u,Y as y,c$ as _}from"./iframe-CkXwiOco.js";import{w as m,c as D}from"./ContextDecorators-DmqPFGEm.js";import{F as N,A as v}from"./FullførtStilling-3Brz3AHQ.js";import{R as T}from"./GjenåpneStillingKnapp-BQ2OT5SY.js";import{T as A}from"./TilgangskontrollForInnhold-DUyEFD5h.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DtOCfj4G.js";import"./OrganisasjonsnummerAlert-C8tSdnIi.js";import"./VStack-JNDCCjJP.js";import"./BasePrimitive-D7804odP.js";import"./List-ZBexDUX1.js";import"./Link-CKbZ3XZg.js";import"./KandidatHendelseTag-DyaZCOwo.js";import"./Tag-qHxTQz7s.js";import"./ChatExclamationmark-B7WMmAvI.js";import"./FileXMark-LvRGHOt7.js";import"./Trash-iId3LJot.js";import"./HandShakeHeart-ePZKpLk3.js";import"./Calendar-D-qcCiQb.js";import"./ThumbUp-BFGcaxts.js";import"./Table-B_b5D6yB.js";import"./index-B_Gmig1n.js";import"./index-B40KJ5b4.js";import"./util-DN9Wte-k.js";import"./DatoVelger-YJzRa3l3.js";import"./useDatepicker-BpkFeWNh.js";import"./useControllableState-CyMfcbpD.js";import"./Modal-CT8FsD8G.js";import"./floating-ui.react-DsSZBiJ6.js";import"./Date.Input-B5_L8H_W.js";import"./useFormField-Rq_gcKQ5.js";import"./ChevronDown-D3-xymWN.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-DK3ALoYQ.js";import"./Modal.context-B5bY_3Nt.js";import"./Popover-Cb54VGaA.js";import"./DismissableLayer-B8alNiQB.js";import"./startOfMonth-jHdvU25x.js";import"./Select-DZUtP0Zt.js";import"./endOfMonth-Bp96C1QB.js";import"./ArrowLeft-CO4DiDm_.js";import"./ArrowRight-Dd2XHmZ2.js";import"./isSameDay-CSHQotvq.js";import"./Checkbox-CbcgVBKD.js";import"./Fieldset-BhCzj9oi.js";import"./accordion-CF9JaLfg.js";import"./index-DL5R_Fgc.js";import"./index-DMNbGPaE.js";import"./index-DMZIqVic.js";import"./Box-DIwo_REn.js";import"./Bell-C8Gdy6D3.js";import"./PersonChat-CcGxhU55.js";import"./Eye-CyAdAsLB.js";import"./ProgressBar-COc09JAp.js";import"./useLatestRef-Dxnkt8Ao.js";import"./EyeSlash-BwI230CG.js";import"./CircleSlash-N7CHUmcY.js";import"./Pencil-Br6Avq3h.js";import"./FullførStillingModal-DQ_t22u8.js";import"./PersonbrukerTekst-DAm1yxsJ.js";import"./ClockDashed-BGj4kTRF.js";import"./IkonNavnAvatar-uzhS6Srd.js";import"./umamiEvents-DSuxYBjR.js";import"./Tasklist-CQKdi_ol.js";import"./ErrorBoundary-F5oO6p_9.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Wt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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

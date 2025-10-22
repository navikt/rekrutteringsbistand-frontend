import{am as w,an as I,j as t,p as k,S as j,cc as x,cg as b,ci as g,cd as u,aK as y,cw as _}from"./iframe-C97ZE7sg.js";import{w as m,c as D}from"./ContextDecorators-DNnHVWqB.js";import{F as N,A as v}from"./FullførtStilling-BjslGpX5.js";import{R as T}from"./GjenåpneStillingKnapp-w17i7VO_.js";import{T as A}from"./TilgangskontrollForInnhold-D_H0WgSM.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-D8K9ewFu.js";import"./OrganisasjonsnummerAlert-D-BJV996.js";import"./VStack-UVKBDTSt.js";import"./BasePrimitive--wAx-l74.js";import"./List-BELJIMKe.js";import"./Link-CokqFeTg.js";import"./KandidatHendelseTag-C2KYmOIC.js";import"./Tag-iPE2K53n.js";import"./ChatExclamationmark-ZO-_zv82.js";import"./FileXMark-Bv0ZFBeU.js";import"./Trash-BT-FVWpx.js";import"./HandShakeHeart-B3GyMym4.js";import"./Calendar-CzqPLvaE.js";import"./ThumbUp-fgEACwNE.js";import"./Table-B96hvVL5.js";import"./util-ByCv2TR0.js";import"./format-Dpd-SLgv.js";import"./match-Cb4eL_Of.js";import"./parse-C5RlZesN.js";import"./getDefaultOptions-Bw1oc0Sy.js";import"./parseISO-BNRoldpU.js";import"./util-BZtQgFRo.js";import"./accordion-DAyOUTfw.js";import"./index-DAUN30YT.js";import"./index-BBbiosxo.js";import"./index-q1QO77Zb.js";import"./ChevronDown-DxB1dxI9.js";import"./Box-CVutnD5z.js";import"./Bell-zkgtn_TI.js";import"./PersonChat-Cpyf7UNi.js";import"./Eye-DY4SrUlo.js";import"./ProgressBar-CfXoUpSG.js";import"./EyeSlash-Cm1TlO4V.js";import"./CircleSlash-D55qNFyE.js";import"./Modal-BG28xXoW.js";import"./floating-ui.react-BWdrZTEV.js";import"./Date.Input-GNTXNypm.js";import"./useFormField-Clw1DWDD.js";import"./useControllableState-D5C62osY.js";import"./Modal.context-CU_WWhvz.js";import"./Checkbox-SaZAnLoH.js";import"./Fieldset-DW6LX2rd.js";import"./Pencil-B-pYRNdF.js";import"./PersonbrukerTekst-BaUa7vpY.js";import"./ClockDashed-pg_1hl8o.js";import"./Tasklist-DBmth_ic.js";import"./ErrorBoundary-BAu26KcZ.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=w(),d=I(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Lt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Lt as default};

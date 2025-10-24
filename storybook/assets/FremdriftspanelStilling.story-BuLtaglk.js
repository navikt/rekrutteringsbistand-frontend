import{am as w,an as I,j as t,p as k,S as j,cc as x,cg as b,ci as g,cd as u,aK as y,cw as _}from"./iframe-DsITc3mA.js";import{w as m,c as D}from"./ContextDecorators-CSolmKQ1.js";import{F as N,A as v}from"./FullførtStilling-CctUWUjE.js";import{R as T}from"./GjenåpneStillingKnapp-Bv1k7wfA.js";import{T as A}from"./TilgangskontrollForInnhold-CYBC0yxC.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CUXpiv9x.js";import"./OrganisasjonsnummerAlert-BUC-F67u.js";import"./VStack-CvyiRE_f.js";import"./BasePrimitive--oSe4LW5.js";import"./List-CfXJtGdf.js";import"./Link-CY2UgJGm.js";import"./KandidatHendelseTag-w5zbIbts.js";import"./Tag-CLKybL4q.js";import"./ChatExclamationmark-DfMjluRc.js";import"./FileXMark-CrazEVzb.js";import"./Trash-DJTn7uuz.js";import"./HandShakeHeart-CaKP5WEO.js";import"./Calendar-UeiytvH-.js";import"./ThumbUp-Cr3eCfzz.js";import"./Table-DmabxBb3.js";import"./util-DfoRtf8j.js";import"./format-CX2UATzM.js";import"./match-HK4rQPNG.js";import"./parse-rayuB1S9.js";import"./getDefaultOptions-V7gnzTBC.js";import"./parseISO-BT7fYFKm.js";import"./util-DXyUuqfd.js";import"./accordion-BYYrCRh7.js";import"./index-Dp7r0eCu.js";import"./index-BlUR7tuq.js";import"./index-BAYsem-A.js";import"./ChevronDown-D99Fb3BD.js";import"./Box-RRvH3g-Z.js";import"./Bell-Bpbpo76-.js";import"./PersonChat-C_oo_AjB.js";import"./Eye-D3o-oj24.js";import"./ProgressBar-nd1D-4ur.js";import"./EyeSlash-BA4mVCOz.js";import"./CircleSlash-CGrgz_Ec.js";import"./Modal-DXMHfo8J.js";import"./floating-ui.react-CO8u8-zc.js";import"./Date.Input-v1rNPlVl.js";import"./useFormField-3f-yTkw_.js";import"./useControllableState-DLUEVyO-.js";import"./Modal.context-CTOTWPev.js";import"./Checkbox-C2dbk2AE.js";import"./Fieldset-C9RQ5--v.js";import"./Pencil-De1nvOJg.js";import"./PersonbrukerTekst-n6G6W-5P.js";import"./ClockDashed-CyKr0cJ4.js";import"./Tasklist-DEY-3a0e.js";import"./ErrorBoundary-Dmukpy-I.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=w(),d=I(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Lt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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

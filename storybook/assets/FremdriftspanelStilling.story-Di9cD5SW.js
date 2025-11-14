import{aI as I,Q as w,j as t,w as k,S as x,cx as j,cF as b,cE as g,cy as u,V as y,cU as _}from"./iframe-ft6w6Wdm.js";import{w as m,c as A}from"./ContextDecorators-DwEJcRYu.js";import{F as N,A as v}from"./FullførtStilling-3PnhzCW4.js";import{R as T}from"./GjenåpneStillingKnapp-Bj-8sbL8.js";import{T as E}from"./TilgangskontrollForInnhold-Daq2N17z.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-B1I5LHQm.js";import"./OrganisasjonsnummerAlert-Ciny46VT.js";import"./VStack-DNeHZhTP.js";import"./BasePrimitive-_eBTgk3A.js";import"./List-B_6gCJvD.js";import"./Link-Bjy5BopZ.js";import"./KandidatHendelseTag-BzevYHoG.js";import"./Tag-BlUIK-vn.js";import"./ChatExclamationmark-CbWzzwkU.js";import"./FileXMark-CapRqFxj.js";import"./Trash-BeWHCtV-.js";import"./HandShakeHeart-D9kNQldF.js";import"./Calendar-BBxBl6ki.js";import"./ThumbUp-D5VKUCEZ.js";import"./Table-wKUEyQsU.js";import"./util-Cb7eeMNc.js";import"./parse-PSqnlPmE.js";import"./getDefaultOptions-CTJLxZl4.js";import"./parseISO-Dhwx3Di0.js";import"./index-CEl6i_yI.js";import"./index-B40KJ5b4.js";import"./isBefore-FHSZ9UXM.js";import"./util-BGf-ull0.js";import"./accordion-CcwMDiLo.js";import"./index-hcE7sDtg.js";import"./index-Cehls_sL.js";import"./index-BY5OpuFO.js";import"./ChevronDown-CIAFQB1t.js";import"./Box-fT2AnTSe.js";import"./Bell--Q7DLPGq.js";import"./PersonChat-CXS685YC.js";import"./Eye-B4ETx0AT.js";import"./ProgressBar-C6USPyoV.js";import"./EyeSlash-C1trPeS4.js";import"./CircleSlash-DeMHoM0A.js";import"./Modal-DOeJNTlv.js";import"./floating-ui.react-Dms4syf-.js";import"./Date.Input-Bsl0jub-.js";import"./useFormField-D1Ch0Fnu.js";import"./useControllableState-BpidpNKQ.js";import"./Modal.context-DA2sPsBB.js";import"./Checkbox-Dx75utL-.js";import"./Fieldset-Dz3VxCtw.js";import"./Pencil-OAlsv9L0.js";import"./PersonbrukerTekst-D15SyITv.js";import"./ClockDashed-yroDINFq.js";import"./Tasklist-CNfmpfl3.js";import"./ErrorBoundary-Bg7o1UX2.js";function n({dropDown:r}){const{stillingsData:i,erEier:D}=I(),d=w(i,D),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(E,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(E,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Lt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=A({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=A({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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

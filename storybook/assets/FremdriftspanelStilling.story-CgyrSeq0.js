import{am as w,an as I,j as t,p as k,S as j,cc as x,cg as b,ci as g,cd as u,aK as y,cw as _}from"./iframe-BI-wOhDW.js";import{w as m,c as D}from"./ContextDecorators-Cbg4Qioh.js";import{F as N,A as v}from"./FullførtStilling-oAwiJav2.js";import{R as T}from"./GjenåpneStillingKnapp-BnJCwae3.js";import{T as A}from"./TilgangskontrollForInnhold-C4mrsUZF.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DKa98RjW.js";import"./OrganisasjonsnummerAlert-DvIP9YpF.js";import"./VStack-5t71I81C.js";import"./BasePrimitive-CyEUpN4A.js";import"./List-DaEFvDd0.js";import"./Link-CbybqPuY.js";import"./KandidatHendelseTag-LdG59OF-.js";import"./Tag-CoYdrjhu.js";import"./ChatExclamationmark-1aiRWdvi.js";import"./FileXMark-7SYvXUvm.js";import"./Trash-BWVielyQ.js";import"./HandShakeHeart-C6sS2LfC.js";import"./Calendar-DoXIVeT3.js";import"./ThumbUp-BBWDCzSk.js";import"./Table-DBzuuHb3.js";import"./util-VPWGOupN.js";import"./format-C4wZl0k7.js";import"./match-CxVFVvJa.js";import"./parse-DT2NsE4V.js";import"./getDefaultOptions-DlIahH4Y.js";import"./parseISO-C8NqvTw9.js";import"./index-CM80Zpw7.js";import"./index-B40KJ5b4.js";import"./isBefore-C7-6PEcE.js";import"./util-BbhlvIaM.js";import"./accordion-euG7wV8O.js";import"./index-DtTHP_Pi.js";import"./index-CUosy4tD.js";import"./index-C3VHhncR.js";import"./ChevronDown-DnpdpR7X.js";import"./Box-r-zVDvY0.js";import"./Bell-DDseNt7s.js";import"./PersonChat-CwxjBG6D.js";import"./Eye-Ckc7loQk.js";import"./ProgressBar-DOEkTOkD.js";import"./EyeSlash-DSjneb4P.js";import"./CircleSlash-BSUyS85a.js";import"./Modal-DpxmUOHV.js";import"./floating-ui.react-CgJwLGYV.js";import"./Date.Input-DYRBxtfE.js";import"./useFormField-B53o4-NQ.js";import"./useControllableState-Buz9rD4N.js";import"./Modal.context-BomWj9n6.js";import"./Checkbox-mGR4NXnf.js";import"./Fieldset-BBcvt_fR.js";import"./Pencil-3cuke6ap.js";import"./PersonbrukerTekst-C497R3xm.js";import"./ClockDashed-2V1lRuvh.js";import"./Tasklist-Dt6I1D-k.js";import"./ErrorBoundary-ScIdqLlg.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=w(),d=I(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Vt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Vt as default};

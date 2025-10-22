import{am as w,an as I,j as t,p as k,S as j,cc as x,cg as b,ci as g,cd as u,aK as y,cw as _}from"./iframe-CFPerreN.js";import{w as m,c as D}from"./ContextDecorators-BmRTlrP1.js";import{F as N,A as v}from"./FullførtStilling-bkqkUoiq.js";import{R as T}from"./GjenåpneStillingKnapp-DWgdv3zN.js";import{T as A}from"./TilgangskontrollForInnhold-CA0ygpV8.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DbyYA3lg.js";import"./OrganisasjonsnummerAlert-_IJk2d2H.js";import"./VStack-BBO2SMmH.js";import"./BasePrimitive-DQxgn5I-.js";import"./List-D70wJ2WL.js";import"./Link-CjMY8Y91.js";import"./KandidatHendelseTag-DZWy4QIZ.js";import"./Tag-BcgSs725.js";import"./ChatExclamationmark-BWol-AQi.js";import"./FileXMark-DmlcMlCZ.js";import"./Trash-BXdMlBC3.js";import"./HandShakeHeart-BKmIWuvG.js";import"./Calendar-CizdEyps.js";import"./ThumbUp-CXARo9HL.js";import"./Table-CIayWjTW.js";import"./util-Ny31ce32.js";import"./format-Dlji57sT.js";import"./match-Ddj5mRs6.js";import"./parse-ByiE-1KN.js";import"./getDefaultOptions-DoSM8sBS.js";import"./parseISO-F7SnvxB9.js";import"./util-DmWt790Q.js";import"./accordion-CjSXhKtt.js";import"./index-BvLHr9Y6.js";import"./index-DiU43as9.js";import"./index-BfyfqSSN.js";import"./ChevronDown-C2Xb0Hp_.js";import"./Box-T3yLcPCm.js";import"./Bell-BDo8EmAo.js";import"./PersonChat-B39f9tYl.js";import"./Eye-DOCsuj0t.js";import"./ProgressBar-Mb1_spHo.js";import"./EyeSlash-BVZnK_Zo.js";import"./CircleSlash-BGwM-CN6.js";import"./Modal-B3ndqrmr.js";import"./floating-ui.react-CDIUzIAN.js";import"./Date.Input-BKsvLY9l.js";import"./useFormField-Bmffen5_.js";import"./useControllableState-3kn0Fx76.js";import"./Modal.context-0umXxUAh.js";import"./Checkbox-Y1p3N9ug.js";import"./Fieldset-qAdqqQTm.js";import"./Pencil-9gu4uw9R.js";import"./PersonbrukerTekst-Dl78Xz1O.js";import"./ClockDashed-CUZtDKwf.js";import"./Tasklist-DaArN9wp.js";import"./ErrorBoundary-BzqfcdUk.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=w(),d=I(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Lt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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

import{h as I,j as t,aL as k,S as w,h_ as j,i9 as u,ia as x}from"./iframe-2oXcNiqk.js";import{w as m,c as D}from"./ContextDecorators-y7sOmqA4.js";import{K as b}from"./schema.zod-CURaHci_.js";import{u as _}from"./useKandidatlisteForEier-_joL_1Vd.js";import{F as y,A as N}from"./FullførtStilling-BjedZY1C.js";import{R as T}from"./GjenåpneStillingKnapp-CmmJjPLR.js";import{K as g,I as v}from"./KandidatTyper-CkRsvxsW.js";import{T as A}from"./TilgangskontrollForInnhold-CUVAHzOh.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-9cw44CFx.js";import"./OrganisasjonsnummerAlert-Co5iX4pO.js";import"./VStack-BUstKu9N.js";import"./BasePrimitive-D35wACDJ.js";import"./List-NYF0RnVw.js";import"./Link-DL5GC8Kj.js";import"./KandidatHendelseTag-DK-cwbPx.js";import"./Tag-B42hqPtf.js";import"./ChatExclamationmark-D2kVWZgc.js";import"./FileXMark-Cx8wRif0.js";import"./Trash-BPy2QyW5.js";import"./HandShakeHeart-C7XDbjKV.js";import"./Calendar-DCiz2ZNN.js";import"./ThumbUp-HVgTX8jg.js";import"./Table-Ci_5s20-.js";import"./util-CnlfkwHW.js";import"./format-DWR74HJu.js";import"./match-BjocQXBS.js";import"./parseISO-CK2-VrtQ.js";import"./parse-CySyyd9K.js";import"./getDefaultOptions-DQBqaWPU.js";import"./util-utnAozoB.js";import"./kandidat.mock-upCpShhS.js";import"./innsatsgrupper-BqldBv0r.js";import"./accordion-Cp3IGC9j.js";import"./index-ChbT5QpA.js";import"./index-UX5aoO6F.js";import"./index-Mp5FUYdU.js";import"./ChevronDown-D00_874Q.js";import"./Box-apRlbBNj.js";import"./Bell-DZ1FQoqd.js";import"./PersonChat-BkY5be6v.js";import"./Eye-mH1KeBWR.js";import"./ProgressBar-D1E9VmJg.js";import"./oppdaterStilling-BqHBbE6X.js";import"./EyeSlash-B2XlDgL5.js";import"./CircleSlash-DfG48S01.js";import"./Modal-pL3N-R8J.js";import"./floating-ui.react-DF0Q9kmB.js";import"./Date.Input-Bqt9RLEn.js";import"./useFormField-CJzQfYGu.js";import"./useControllableState-n5Q65I8H.js";import"./Modal.context-ZJRuN0us.js";import"./Checkbox-DpKFyikM.js";import"./Fieldset-CkRL5sHz.js";import"./Pencil-DuTwWBwf.js";import"./PersonbrukerTekst-BehY9Y1Z.js";import"./ClockDashed-BdF2k8na.js";import"./Tasklist-g1vdXe60.js";import"./ErrorBoundary-BI2aRmHI.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=_(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(w,{hooks:[d],children:e=>{const F=e.status===b.Lukket&&i.stilling.status===j.Stoppet,f=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,K=e?.kandidater.filter(s=>s.utfallsendringer.some(R=>R.sendtTilArbeidsgiversKandidatliste===!0)).length??0,B=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,h=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,S=B+h;return F?t.jsx(y,{dropDown:r,totalStillinger:f,antallFåttJobben:S}):t.jsx(N,{antallFåttJobben:S,antallDelt:K,totalStillinger:f,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Pt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:v.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=x,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Pt as default};

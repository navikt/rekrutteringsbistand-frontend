import{h as I,j as t,aL as k,S as w,h_ as j,i9 as u,ia as x}from"./iframe-05oBaVfn.js";import{w as m,c as D}from"./ContextDecorators-CjxeUnpe.js";import{K as b}from"./schema.zod-BoLvg5nC.js";import{u as _}from"./useKandidatlisteForEier-BUUG17GG.js";import{F as y,A as N}from"./FullførtStilling-zh7-nd4w.js";import{R as T}from"./GjenåpneStillingKnapp-Bgl-GLJr.js";import{K as g,I as v}from"./KandidatTyper-CkRsvxsW.js";import{T as A}from"./TilgangskontrollForInnhold-CE2QhJxM.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-BMcoCEUY.js";import"./OrganisasjonsnummerAlert-8qcE1i83.js";import"./VStack-1vjSpxqT.js";import"./BasePrimitive-pNF9eC2e.js";import"./List-BDBXu_9k.js";import"./Link-p2BgAcBD.js";import"./KandidatHendelseTag-B2gam4sj.js";import"./Tag-VBAtqkwm.js";import"./FileXMark-CsKpNh5P.js";import"./Trash-C72NRxO4.js";import"./HandShakeHeart-BirlqDY3.js";import"./Calendar-DwravAwF.js";import"./ThumbUp-D7_fBo-q.js";import"./Table-BKxuDwXI.js";import"./util-B0mFY22O.js";import"./format-C6aU4gM_.js";import"./match-DNHKAvxP.js";import"./parseISO-6O0VV1U3.js";import"./parse-UjKB24uP.js";import"./getDefaultOptions-DyEQjLT5.js";import"./util-B6qVNUUJ.js";import"./kandidat.mock-Bplmypte.js";import"./innsatsgrupper-BqldBv0r.js";import"./accordion-DOBaGjpE.js";import"./index-Bz7E5r9-.js";import"./index-DmPi2a2Z.js";import"./index-W5EgSRJK.js";import"./ChevronDown-DiOK9z2y.js";import"./Box-UcgCbmev.js";import"./Bell-BPQlV1DM.js";import"./PersonChat-Bit_OS2j.js";import"./Eye-Da_1QVCW.js";import"./ProgressBar-HD9ykVlC.js";import"./oppdaterStilling-CeWNLBTt.js";import"./EyeSlash-B3z4Kni8.js";import"./CircleSlash-DbkTf7Ta.js";import"./Modal-BVQTtIOQ.js";import"./floating-ui.react-CuoSq-8-.js";import"./Date.Input-13kb3myE.js";import"./useFormField-CLMYpey8.js";import"./useControllableState-BP2RiIUM.js";import"./Modal.context-BkhHfaBb.js";import"./Checkbox-Ds_72s_p.js";import"./Fieldset-DSxcCVQN.js";import"./Pencil-BOV4gfCh.js";import"./PersonbrukerTekst-aj6f6yFg.js";import"./ClockDashed-AzBpfR0q.js";import"./Tasklist-D1UJG-6S.js";import"./ErrorBoundary-DcL02yrk.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=_(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(w,{hooks:[d],children:e=>{const F=e.status===b.Lukket&&i.stilling.status===j.Stoppet,f=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,K=e?.kandidater.filter(s=>s.utfallsendringer.some(R=>R.sendtTilArbeidsgiversKandidatliste===!0)).length??0,B=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,h=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,S=B+h;return F?t.jsx(y,{dropDown:r,totalStillinger:f,antallFåttJobben:S}):t.jsx(N,{antallFåttJobben:S,antallDelt:K,totalStillinger:f,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Ot={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:v.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=x,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Ot as default};

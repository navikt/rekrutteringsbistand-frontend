import{h as I,j as t,aL as k,S as w,h_ as j,i9 as u,ia as x}from"./iframe-UjNt-zBO.js";import{w as m,c as D}from"./ContextDecorators-C30PrXta.js";import{K as b}from"./schema.zod-DOqzlHAl.js";import{u as _}from"./useKandidatlisteForEier-TvlH73Eq.js";import{F as y,A as N}from"./FullførtStilling-uQafzgqx.js";import{R as T}from"./GjenåpneStillingKnapp-B6I_ro3X.js";import{K as g,I as v}from"./KandidatTyper-CkRsvxsW.js";import{T as A}from"./TilgangskontrollForInnhold-Tjn9AYcc.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-DAs4tGP3.js";import"./OrganisasjonsnummerAlert-BPyO27kT.js";import"./VStack-mc8H1tM0.js";import"./BasePrimitive-B__jwBzH.js";import"./List-nP_AfZ2o.js";import"./Link-wUd1tDUs.js";import"./KandidatHendelseTag-CbZOketc.js";import"./Tag-BSmjQs8J.js";import"./ChatExclamationmark-BF1mIJ-k.js";import"./FileXMark-DuHeyXFT.js";import"./Trash-C3ObPB-Y.js";import"./HandShakeHeart-DNxzqHyN.js";import"./Calendar-lsXea1Wh.js";import"./ThumbUp-vYWQfMS3.js";import"./Table-C8KeRzZn.js";import"./util-HQ_OYy-u.js";import"./format-BsgKkAMj.js";import"./match-qxZlEw6J.js";import"./parseISO-Cxtu-_IP.js";import"./parse-DABQu9wW.js";import"./getDefaultOptions-1bbeywKy.js";import"./util-puWZ81cp.js";import"./kandidat.mock-D2pWdQUF.js";import"./innsatsgrupper-BqldBv0r.js";import"./accordion-DaJ58BNq.js";import"./index-DAkjJ3gn.js";import"./index-DbZ9WaqL.js";import"./index-DDaHwkk7.js";import"./ChevronDown-BhKbsGuQ.js";import"./Box-BjPUAc8K.js";import"./Bell-CxnnDFr6.js";import"./PersonChat-DWWG3hMx.js";import"./Eye-NN6GHExU.js";import"./ProgressBar-D3zo81rG.js";import"./oppdaterStilling-GenYyHox.js";import"./EyeSlash-CzOdOMHP.js";import"./CircleSlash-C9DxY2Zx.js";import"./Modal-ixcUKZqK.js";import"./floating-ui.react-CI9_OYBn.js";import"./Date.Input-CPpcN85d.js";import"./useFormField-CJ0XBcBD.js";import"./ReadMore-nHc54yo_.js";import"./useControllableState-DzzemiT1.js";import"./Modal.context-pcs4IwGf.js";import"./Checkbox-CXcaQ6We.js";import"./Fieldset-N4cBjVkI.js";import"./Pencil-q62mR91A.js";import"./PersonbrukerTekst-Owl11-5M.js";import"./ClockDashed-BnQ_23sC.js";import"./Tasklist-BCWr6yzX.js";import"./ErrorBoundary-CsTQ5748.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=_(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(w,{hooks:[d],children:e=>{const F=e.status===b.Lukket&&i.stilling.status===j.Stoppet,f=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,K=e?.kandidater.filter(s=>s.utfallsendringer.some(R=>R.sendtTilArbeidsgiversKandidatliste===!0)).length??0,B=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,h=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,S=B+h;return F?t.jsx(y,{dropDown:r,totalStillinger:f,antallFåttJobben:S}):t.jsx(N,{antallFåttJobben:S,antallDelt:K,totalStillinger:f,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Ct={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:v.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=x,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Ct as default};

import{h as I,j as t,aL as k,S as w,h_ as j,i9 as u,ia as x}from"./iframe-CswQ52iW.js";import{w as m,c as D}from"./ContextDecorators-DfyHKVNx.js";import{K as b}from"./schema.zod-YFqBDfno.js";import{u as _}from"./useKandidatlisteForEier-Bz1x4GQ0.js";import{F as y,A as N}from"./FullførtStilling-7sK5tQdR.js";import{R as T}from"./GjenåpneStillingKnapp-DibCA9jd.js";import{K as g,I as v}from"./KandidatTyper-CkRsvxsW.js";import{T as A}from"./TilgangskontrollForInnhold-Dm8yZduy.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-DdJJOJES.js";import"./OrganisasjonsnummerAlert-C_dZuz5h.js";import"./VStack-CO02QYJ4.js";import"./BasePrimitive-DOkvrNwr.js";import"./List-y9Ivl-nr.js";import"./Link-C1U-NoKr.js";import"./KandidatHendelseTag-jlYFG7kK.js";import"./Tag-BEaU4_W2.js";import"./ChatExclamationmark-C9qPXWWl.js";import"./FileXMark-CC-TW-0x.js";import"./Trash-N2sZKuep.js";import"./HandShakeHeart-DlVbhZHH.js";import"./Calendar-CIo7mz4I.js";import"./ThumbUp-DIlX0079.js";import"./Table-e71y4keD.js";import"./util-Da6d0B2L.js";import"./format-DnOgx47x.js";import"./match-DWQd-a6q.js";import"./parseISO-Cj7Hn8SS.js";import"./parse-axsS0z-T.js";import"./getDefaultOptions-B62WXdzl.js";import"./util-CNA8c2BR.js";import"./kandidat.mock-DYIn-JzC.js";import"./innsatsgrupper-BqldBv0r.js";import"./accordion-BvBtQNaN.js";import"./index-CcCInGNC.js";import"./index-BXFBnZpq.js";import"./index-CEeqYp1k.js";import"./ChevronDown-UH5ZcIpy.js";import"./Box-Bae00wHO.js";import"./Bell-CiHHAN1J.js";import"./PersonChat-jld7qFmk.js";import"./Eye-dALhlSm5.js";import"./ProgressBar-CbdWksGr.js";import"./oppdaterStilling-CHLZFWJJ.js";import"./EyeSlash-CNdkGtDj.js";import"./CircleSlash-BKCOgemb.js";import"./Modal-JZXnKh6K.js";import"./floating-ui.react-Bdf2hTEs.js";import"./Date.Input-BFwAK_Mx.js";import"./useFormField-D5mSIokf.js";import"./useControllableState-B4VxQDDJ.js";import"./Modal.context-0hUha6_y.js";import"./Checkbox-BWLIyR7K.js";import"./Fieldset-ysEqgwTa.js";import"./Pencil-_srI4oFu.js";import"./PersonbrukerTekst-1ULKsfkB.js";import"./ClockDashed-D1ghNuDS.js";import"./Tasklist-Bg2lpnpe.js";import"./ErrorBoundary-CK1f0yXw.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=_(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(w,{hooks:[d],children:e=>{const F=e.status===b.Lukket&&i.stilling.status===j.Stoppet,f=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,K=e?.kandidater.filter(s=>s.utfallsendringer.some(R=>R.sendtTilArbeidsgiversKandidatliste===!0)).length??0,B=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,h=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,S=B+h;return F?t.jsx(y,{dropDown:r,totalStillinger:f,antallFåttJobben:S}):t.jsx(N,{antallFåttJobben:S,antallDelt:K,totalStillinger:f,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Pt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:v.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=x,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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

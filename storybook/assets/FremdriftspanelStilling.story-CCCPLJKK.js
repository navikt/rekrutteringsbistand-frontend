import{h as I,j as t,aL as k,S as w,h_ as j,i9 as u,ia as x}from"./iframe-D0HnIaN5.js";import{w as m,c as D}from"./ContextDecorators-D0_yNVHX.js";import{K as b}from"./schema.zod-4Sh1qq9A.js";import{u as _}from"./useKandidatlisteForEier-CFn8klJF.js";import{F as y,A as N}from"./FullførtStilling-Cxpdz4mT.js";import{R as T}from"./GjenåpneStillingKnapp-FieWfeMV.js";import{K as g,I as v}from"./KandidatTyper-CkRsvxsW.js";import{T as A}from"./TilgangskontrollForInnhold-Csn_zn6S.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-CaiTux_G.js";import"./OrganisasjonsnummerAlert-BUiP5WNV.js";import"./VStack-Cwz6rHDN.js";import"./BasePrimitive-DVXlaCRH.js";import"./List-Dkwgn3Gq.js";import"./Link-BuJgBJVq.js";import"./KandidatHendelseTag-HEwqK8Da.js";import"./Tag-BONzrFqA.js";import"./ChatExclamationmark-BZnZ9OfB.js";import"./FileXMark-D5dRoIAY.js";import"./Trash-Cj-kqVJY.js";import"./HandShakeHeart-BXaHNstn.js";import"./Calendar-CY7SvHHg.js";import"./ThumbUp-EXSgiQs3.js";import"./Table-CC0EebB-.js";import"./util-B7WynFbs.js";import"./format-Df3CFIuT.js";import"./match-BdVai8s9.js";import"./parseISO-DO2-pDco.js";import"./parse-BpIyXLCF.js";import"./getDefaultOptions-x-DNWUP6.js";import"./util-BkUCqppR.js";import"./kandidat.mock-BbyMcYLX.js";import"./innsatsgrupper-BqldBv0r.js";import"./accordion-Cplvku57.js";import"./index-BZHvXlim.js";import"./index-DKVG5XqT.js";import"./index-TR86jDN7.js";import"./ChevronDown-DSTHU4Gv.js";import"./Box-CtcR_0dN.js";import"./Bell-CM8ubUM_.js";import"./PersonChat-rvNXdZ1l.js";import"./Eye-D8YMwSsx.js";import"./ProgressBar-CHtajen4.js";import"./oppdaterStilling-CM2V-20C.js";import"./EyeSlash-CQ8cfdXy.js";import"./CircleSlash-Dj1Iir6-.js";import"./Modal-CIRswf3U.js";import"./floating-ui.react-Bcl6AuG2.js";import"./Date.Input-B_7i3YvQ.js";import"./useFormField-Cc3d1c1D.js";import"./useControllableState-5Raq7Ez2.js";import"./Modal.context-D5WfPZho.js";import"./Checkbox-Q-9E9dgU.js";import"./Fieldset-DGIvy1bT.js";import"./Pencil-ZSbOo1EG.js";import"./PersonbrukerTekst-Bf5BDlq3.js";import"./ClockDashed-C2pvnAJr.js";import"./Tasklist-DD2miQny.js";import"./ErrorBoundary-DDn_Oz_C.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=_(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(w,{hooks:[d],children:e=>{const F=e.status===b.Lukket&&i.stilling.status===j.Stoppet,f=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,K=e?.kandidater.filter(s=>s.utfallsendringer.some(R=>R.sendtTilArbeidsgiversKandidatliste===!0)).length??0,B=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,h=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,S=B+h;return F?t.jsx(y,{dropDown:r,totalStillinger:f,antallFåttJobben:S}):t.jsx(N,{antallFåttJobben:S,antallDelt:K,totalStillinger:f,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Pt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:v.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=x,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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

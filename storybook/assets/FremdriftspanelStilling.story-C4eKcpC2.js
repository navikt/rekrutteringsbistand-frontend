import{h as I,j as t,aL as k,S as w,h_ as j,i9 as u,ia as x}from"./iframe-D-AjZlUt.js";import{w as m,c as D}from"./ContextDecorators-CWZNzSsI.js";import{K as b}from"./schema.zod-DN8VKkm_.js";import{u as _}from"./useKandidatlisteForEier-D2Hru4bA.js";import{F as y,A as N}from"./FullførtStilling-CeRTsc1O.js";import{R as T}from"./GjenåpneStillingKnapp-BJ6mWGEI.js";import{K as g,I as v}from"./KandidatTyper-CkRsvxsW.js";import{T as A}from"./TilgangskontrollForInnhold-BasRq2uu.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-Cvi2YthW.js";import"./OrganisasjonsnummerAlert-ZFPNdvhq.js";import"./VStack-D9az6B_P.js";import"./BasePrimitive-ChIiOCuG.js";import"./List-D3lk6ROm.js";import"./Link-8RMWJEmQ.js";import"./KandidatHendelseTag-CqESFpmQ.js";import"./Tag-DZeuvrYI.js";import"./ChatExclamationmark-NpYoxkY_.js";import"./FileXMark-BjXsB-ap.js";import"./Trash-D--eKmsb.js";import"./HandShakeHeart-yrQFOuhb.js";import"./Calendar-CpmEDSNG.js";import"./ThumbUp-C_umlp3p.js";import"./Table-2kctjMPO.js";import"./util-BLaW0wmH.js";import"./format-wxpr1Ccp.js";import"./match-CR1ydbAl.js";import"./parseISO-BCt-OVe7.js";import"./parse-i1bpAfmg.js";import"./getDefaultOptions-Dkji9mRS.js";import"./util-CWQ2JgV5.js";import"./kandidat.mock-CHWZgYOo.js";import"./innsatsgrupper-BqldBv0r.js";import"./accordion-B__9eMHA.js";import"./index-YdnB86DS.js";import"./index-kTqEvOVY.js";import"./index-BkwleoP6.js";import"./ChevronDown-Canbumtw.js";import"./Box-ixjNQs7d.js";import"./Bell-Cn1UgGxo.js";import"./PersonChat-C603d_6z.js";import"./Eye-WJ4-oNYn.js";import"./ProgressBar-xvrudDvS.js";import"./oppdaterStilling-DuwhYumL.js";import"./EyeSlash-DszgvzJl.js";import"./CircleSlash-Dpoo_fYJ.js";import"./Modal-D6I5DY54.js";import"./floating-ui.react-skxVNIuN.js";import"./Date.Input-CjXymNkg.js";import"./useFormField-BkIpqHlH.js";import"./useControllableState-f-tqrQui.js";import"./Modal.context-DFyDwZnZ.js";import"./Checkbox-DneWEjK7.js";import"./Fieldset-m0C7VkWk.js";import"./Pencil-D_66K7F0.js";import"./PersonbrukerTekst-DL8OgRhU.js";import"./ClockDashed-DE0E0Pui.js";import"./Tasklist-Dpx0SGKA.js";import"./ErrorBoundary-DG9F7C3q.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=_(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(w,{hooks:[d],children:e=>{const F=e.status===b.Lukket&&i.stilling.status===j.Stoppet,f=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,K=e?.kandidater.filter(s=>s.utfallsendringer.some(R=>R.sendtTilArbeidsgiversKandidatliste===!0)).length??0,B=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,h=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,S=B+h;return F?t.jsx(y,{dropDown:r,totalStillinger:f,antallFåttJobben:S}):t.jsx(N,{antallFåttJobben:S,antallDelt:K,totalStillinger:f,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Pt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:v.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=x,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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

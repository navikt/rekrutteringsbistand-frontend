import{h as I,j as t,aL as k,S as w,h_ as j,i9 as u,ia as x}from"./iframe-Bk2ExMXp.js";import{w as m,c as D}from"./ContextDecorators-CaM--hvF.js";import{K as b}from"./schema.zod-DGae9Euo.js";import{u as _}from"./useKandidatlisteForEier-BWJ9zWpe.js";import{F as y,A as N}from"./FullførtStilling-DOgahj11.js";import{R as T}from"./GjenåpneStillingKnapp-DhcXrZK-.js";import{K as g,I as v}from"./KandidatTyper-CkRsvxsW.js";import{T as A}from"./TilgangskontrollForInnhold-aC9M1l6O.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-C4GS2fi3.js";import"./OrganisasjonsnummerAlert-z-4yC7BL.js";import"./VStack-BrgJZela.js";import"./BasePrimitive-B6Z69lzu.js";import"./List-Bj-Vbc_Z.js";import"./Link-ppp_mE_-.js";import"./KandidatHendelseTag-DBqbqhy3.js";import"./Tag-DLOBuFrJ.js";import"./FileXMark-BWnhuBxQ.js";import"./Trash-53uNVUd4.js";import"./HandShakeHeart-FINHHUTp.js";import"./Calendar-PfOWmbw2.js";import"./ThumbUp-BFeRRNd8.js";import"./Table-Cc2h9Gm3.js";import"./util-D0bY77Dv.js";import"./format-CAywRZQ0.js";import"./match-B7tcGX9u.js";import"./parseISO-7TgmH8mW.js";import"./parse-DosHQWMe.js";import"./getDefaultOptions-Ck1xufvy.js";import"./util-Bj9I7rfg.js";import"./kandidat.mock-CHZYOh3h.js";import"./innsatsgrupper-BqldBv0r.js";import"./accordion-DNVrmumZ.js";import"./index-xKhQBw7P.js";import"./index-C9VPVmaA.js";import"./index-BavFbBhu.js";import"./ChevronDown-B7VCVl_G.js";import"./Box-A5nj-QY5.js";import"./Bell-C7elpOfG.js";import"./PersonChat-DlWadD3M.js";import"./Eye-DOuIcr3z.js";import"./ProgressBar-DBDL3C_O.js";import"./oppdaterStilling-e9qj0WrK.js";import"./EyeSlash-Tl1wTL0x.js";import"./CircleSlash-CkKsJg4m.js";import"./Modal-d-ul81sN.js";import"./floating-ui.react-8gdL2Sbe.js";import"./Date.Input-Dy-LTzXk.js";import"./useFormField-Bzn8rkcz.js";import"./useControllableState-JREvtEYi.js";import"./Modal.context-m-44LJgz.js";import"./Checkbox-BNSpOUEx.js";import"./Fieldset-BcPNkgnB.js";import"./Pencil-BpriiMUI.js";import"./PersonbrukerTekst-CYry9amY.js";import"./ClockDashed-vVBOvNnw.js";import"./Tasklist-C9-Qq8I_.js";import"./ErrorBoundary-BLeAs1jk.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=_(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(w,{hooks:[d],children:e=>{const F=e.status===b.Lukket&&i.stilling.status===j.Stoppet,f=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,K=e?.kandidater.filter(s=>s.utfallsendringer.some(R=>R.sendtTilArbeidsgiversKandidatliste===!0)).length??0,B=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,h=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,S=B+h;return F?t.jsx(y,{dropDown:r,totalStillinger:f,antallFåttJobben:S}):t.jsx(N,{antallFåttJobben:S,antallDelt:K,totalStillinger:f,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Ot={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:v.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=x,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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

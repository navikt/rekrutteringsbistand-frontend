import{h as I,j as t,aL as k,S as w,h_ as j,i9 as u,ia as x}from"./iframe-wMpf0ByR.js";import{w as m,c as D}from"./ContextDecorators-BlZgRWkH.js";import{K as b}from"./schema.zod-a2wkpBVO.js";import{u as _}from"./useKandidatlisteForEier-BW-Gbh9t.js";import{F as y,A as N}from"./FullførtStilling-B7fk3UyO.js";import{R as T}from"./GjenåpneStillingKnapp-DKyRiyZp.js";import{K as g,I as v}from"./KandidatTyper-CkRsvxsW.js";import{T as A}from"./TilgangskontrollForInnhold-DiN9sAki.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-C-Hope_N.js";import"./OrganisasjonsnummerAlert-BKr52Xym.js";import"./VStack-37CH0eKn.js";import"./BasePrimitive-DEaSCRuB.js";import"./List-BHDmJnU9.js";import"./Link-C2D8Bda_.js";import"./KandidatHendelseTag-B61CT4h9.js";import"./Tag-C8vi5CtI.js";import"./ChatExclamationmark-DfA6YhNf.js";import"./FileXMark-DeA6pc2C.js";import"./Trash-jLZQ19UU.js";import"./HandShakeHeart-CAERdGPL.js";import"./Calendar-DekOy3Fx.js";import"./ThumbUp-BhbmdYoP.js";import"./Table-BKb7dE0E.js";import"./util-R7omXOg5.js";import"./format-CSHl5Iu1.js";import"./match-Ly9h5Kr8.js";import"./parseISO-CM3aM_-k.js";import"./parse-DhcZKNzd.js";import"./getDefaultOptions-BcXGjLgH.js";import"./util-B6y6F2Hz.js";import"./kandidat.mock-Br9sLpSE.js";import"./innsatsgrupper-BqldBv0r.js";import"./accordion-J1SkpI_S.js";import"./index-BilCkRLu.js";import"./index-4xycxgX2.js";import"./index-Bd_pSWEg.js";import"./ChevronDown-PRNqbvoX.js";import"./Box-6wjC3eJX.js";import"./Bell-DlvEUMKp.js";import"./PersonChat-D-XD8kZW.js";import"./Eye-debA2LSJ.js";import"./ProgressBar-ogDxfxYj.js";import"./oppdaterStilling-BqA9pQ9b.js";import"./EyeSlash-ByS8H_ZJ.js";import"./CircleSlash-DsdhZ1YK.js";import"./Modal-D8kwV6AV.js";import"./floating-ui.react-DjemWi0d.js";import"./Date.Input-ZaD_nC3W.js";import"./useFormField-DY0O83Jc.js";import"./useControllableState-DRGcQ7Ej.js";import"./Modal.context-B2-4rYqW.js";import"./Checkbox-DMJLId8b.js";import"./Fieldset-DWtNb7HA.js";import"./Pencil-BG3hlXcj.js";import"./PersonbrukerTekst-nNOpl83X.js";import"./ClockDashed-Bg0qpSgK.js";import"./Tasklist-BfBYy9uc.js";import"./ErrorBoundary-DXwQQl4T.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=_(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(w,{hooks:[d],children:e=>{const F=e.status===b.Lukket&&i.stilling.status===j.Stoppet,f=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,K=e?.kandidater.filter(s=>s.utfallsendringer.some(R=>R.sendtTilArbeidsgiversKandidatliste===!0)).length??0,B=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,h=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,S=B+h;return F?t.jsx(y,{dropDown:r,totalStillinger:f,antallFåttJobben:S}):t.jsx(N,{antallFåttJobben:S,antallDelt:K,totalStillinger:f,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Pt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:v.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=x,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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

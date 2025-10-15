import{h as I,j as t,aL as k,S as w,h_ as j,i9 as u,ia as x}from"./iframe-BF2JjRIb.js";import{w as m,c as D}from"./ContextDecorators-Cv407SdG.js";import{K as b}from"./schema.zod-DnU0EtC0.js";import{u as _}from"./useKandidatlisteForEier-C1R7WIgO.js";import{F as y,A as N}from"./FullførtStilling-C001qRNV.js";import{R as T}from"./GjenåpneStillingKnapp-Bw7EuU3T.js";import{K as g,I as v}from"./KandidatTyper-CkRsvxsW.js";import{T as A}from"./TilgangskontrollForInnhold-DBdkvR-t.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-Ls8_CSUn.js";import"./OrganisasjonsnummerAlert-BC-J7ELt.js";import"./VStack-D2XpToW5.js";import"./BasePrimitive-B6ClAo5W.js";import"./List-D7FX1_Zl.js";import"./Link-3Il0mwDB.js";import"./KandidatHendelseTag-DlsHvl9D.js";import"./Tag-JhnKerj0.js";import"./ChatExclamationmark-3HEIeY3v.js";import"./FileXMark-CvRmtUPg.js";import"./Trash-Cy4qb-vW.js";import"./HandShakeHeart-IRZ9u8wk.js";import"./Calendar-CaNwtQxw.js";import"./ThumbUp-CBCfZ5PK.js";import"./Table-DCR9Yfuc.js";import"./util-CzdySwzD.js";import"./format-DsqYtoP1.js";import"./match-BAXhuaJs.js";import"./parseISO-DkEUh7B8.js";import"./parse-CR3DJKNM.js";import"./getDefaultOptions-DGDAbzfX.js";import"./util-8MzKMgXQ.js";import"./kandidat.mock-Ce1kc8UM.js";import"./innsatsgrupper-BqldBv0r.js";import"./accordion-Cxhm6jsN.js";import"./index-BAflL8Gc.js";import"./index-Bk4-Y0iL.js";import"./index-BP-aevz_.js";import"./ChevronDown-mfKrmcvR.js";import"./Box-Bj69_RrE.js";import"./Bell-DfyKo2wN.js";import"./PersonChat-57PeNqrN.js";import"./Eye-CXml5EHx.js";import"./ProgressBar-CrNzH8Xu.js";import"./oppdaterStilling-DI8Rjcxm.js";import"./EyeSlash-BD6yXTMQ.js";import"./CircleSlash-BlE8IMHz.js";import"./Modal-CwW-hqK0.js";import"./floating-ui.react-CSL5G9Y5.js";import"./Date.Input-Bz3DyjbI.js";import"./useFormField-Dx9hcS2D.js";import"./useControllableState-B-FHnd1b.js";import"./Modal.context-DpGguQ45.js";import"./Checkbox-BhhY85na.js";import"./Fieldset-B3zqrL-W.js";import"./Pencil-D8aFZJjq.js";import"./PersonbrukerTekst-CZQsoVLB.js";import"./ClockDashed-Ce7NUSFU.js";import"./Tasklist-VpC3O3v6.js";import"./ErrorBoundary-DXDl5vsV.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=_(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(w,{hooks:[d],children:e=>{const F=e.status===b.Lukket&&i.stilling.status===j.Stoppet,f=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,K=e?.kandidater.filter(s=>s.utfallsendringer.some(R=>R.sendtTilArbeidsgiversKandidatliste===!0)).length??0,B=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,h=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,S=B+h;return F?t.jsx(y,{dropDown:r,totalStillinger:f,antallFåttJobben:S}):t.jsx(N,{antallFåttJobben:S,antallDelt:K,totalStillinger:f,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Pt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:v.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=x,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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

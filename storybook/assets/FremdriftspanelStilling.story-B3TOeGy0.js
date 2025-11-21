import{aL as w,Q as I,j as t,w as k,S as j,cz as x,cH as b,cG as g,cA as u,W as y,cW as _}from"./iframe-Jss5f2B_.js";import{w as m,c as D}from"./ContextDecorators-Dh3r8LDl.js";import{F as N,A as v}from"./FullførtStilling-K_VgLQgu.js";import{R as T}from"./GjenåpneStillingKnapp--ijpdWD-.js";import{T as A}from"./TilgangskontrollForInnhold-QORAqDpG.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-Ct0r6n5n.js";import"./OrganisasjonsnummerAlert-DdQwQ_tc.js";import"./VStack-Bvg5AqJD.js";import"./BasePrimitive-d2SIG9Yf.js";import"./List-CE9DLIHw.js";import"./Link-s8QL5d5b.js";import"./KandidatHendelseTag-CAiVXrpu.js";import"./Tag-DMI8stAH.js";import"./ChatExclamationmark-DoO1Xfh2.js";import"./FileXMark-BB5uMe3O.js";import"./Trash-bW2rKM93.js";import"./HandShakeHeart-U7xHXCw-.js";import"./Calendar-Pc9FG0ds.js";import"./ThumbUp-DXiBthy6.js";import"./Table-IzXQZlKx.js";import"./dato-B0xplmbs.js";import"./parse-Cx1esH9S.js";import"./getDefaultOptions-BCEF9-o_.js";import"./parseISO-CMhBJTE1.js";import"./index-CnHa8f62.js";import"./index-B40KJ5b4.js";import"./util-gyJA8csV.js";import"./DatoVelger-BPSynpjt.js";import"./useDatepicker-BFhvMNbT.js";import"./useControllableState-CZKHLiQ0.js";import"./Modal-C5DF6Tu8.js";import"./floating-ui.react-fqAcPkKE.js";import"./Date.Input-Dwqf4bQn.js";import"./useFormField-D0W6d14a.js";import"./ChevronDown-CNVEhu9g.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-Bxl3NU5W.js";import"./Modal.context-55emPdz_.js";import"./Popover-C-0-1OWm.js";import"./DismissableLayer-BExMC79b.js";import"./startOfMonth-CY6hvVCN.js";import"./Select-a-3ig4OZ.js";import"./endOfMonth-8_5xY8gv.js";import"./ArrowLeft-B9JBwl-n.js";import"./ArrowRight-D7SVqoIY.js";import"./isSameDay-B0EFaajr.js";import"./Checkbox-C-XMn35l.js";import"./Fieldset-CXvrV0rh.js";import"./accordion-t8vFwwnI.js";import"./index-CdngSU3I.js";import"./index-DjplGhcd.js";import"./index-bZIJpaKj.js";import"./Box-Cdgc1Das.js";import"./Bell-B7dclY2c.js";import"./PersonChat-mg3Ri7LY.js";import"./Eye-Cu-k0hCA.js";import"./ProgressBar-CZsKOrkN.js";import"./useLatestRef-D6C22Yzy.js";import"./EyeSlash-DdtJQ5Sb.js";import"./CircleSlash-CkwJd_zi.js";import"./Pencil-I67Ffd98.js";import"./FullførStillingModal-iAmcaNto.js";import"./PersonbrukerTekst--uGL9VGA.js";import"./ClockDashed-CaNLgirt.js";import"./umamiEvents-CYDHrNFb.js";import"./Tasklist-BMwev9-s.js";import"./ErrorBoundary-DxyQ4oxI.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=w(),d=I(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Yt={tags:["autodocs"],component:n},o={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},l={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />)
}`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />)
}`,...l.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{o as Aktiv,l as AktivDropdown,p as FormidlingVariant,a as Fullført,Yt as default};
